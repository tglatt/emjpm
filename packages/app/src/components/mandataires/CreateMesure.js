import { format } from "date-fns";
import Router from "next/router";
import React from "react";
import { CheckCircle, PlusSquare, Save, X, XCircle } from "react-feather";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Autocomplete, Button, ToggleState } from "..";
import { civilite, residence, typeMesure } from "../common/nomination";
import { createMesure, createMesureSave } from "./actions/mesures";

const Alert = ({ className, Icon, message }) =>
  (message && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
    >
      <Icon
        style={{
          verticalAlign: "middle",
          marginRight: 10
        }}
      />{" "}
      {message}
    </div>
  )) ||
  null;

const ErrorBox = ({ message }) => (
  <Alert className="alert-danger" Icon={XCircle} message={message} />
);

const SucessBox = ({ message }) => (
  <Alert className="alert-success" Icon={CheckCircle} message={message} />
);

const schema = {
  type: "object",
  required: ["code_postal", "ville", "civilite", "annee", "date_ouverture", "type", "residence"],
  properties: {
    date_ouverture: {
      type: "string",
      format: "date"
    },
    type: {
      type: "string",
      enum: typeMesure
    },
    //TODO(Adrien): discus with PO
    // ti_id: { type: "number" },
    //cabinet: { type: "string", enum: cabinet },
    code_postal: { type: "string" },
    ville: { type: "string" },
    civilite: { type: "string", enum: civilite },

    annee: { type: "integer", default: "" },
    numero_dossier: { type: "string", default: "" },
    residence: {
      type: "string",
      enum: residence
    }
  },
  dependencies: {
    residence: {
      oneOf: [
        {
          properties: {
            residence: {
              enum: ["A Domicile"]
            }
          }
        },
        {
          properties: {
            residence: {
              enum: ["En établissement avec conservation du domicile"]
            }
          }
        },
        {
          properties: {
            residence: {
              enum: ["En établissement"]
            },
            etablissement_id: {
              type: "number"
            }
          }
        }
      ]
    }
  }
};

const uiSchema = {
  date_ouverture: {
    "ui:autofocus": true,
    "ui:title": "Date de décision",
    classNames: "input_mesure_ouverture",
    "ui:options": {
      label: true
    }
  },
  code_postal: {
    "ui:placeholder": "Code Postal",
    classNames: "input_mesure_commune",
    "ui:options": {
      label: false
    }
  },
  type: {
    "ui:placeholder": "Type de mesure",
    classNames: "input_mesure_type",
    "ui:options": {
      label: false
    }
  },
  annee: {
    "ui:placeholder": "Année de naissance",
    "ui:title": "Année de naissance du majeur",
    classNames: "input_mesure_annee",
    "ui:widget": "updown",
    "ui:options": {
      label: true
    }
  },
  civilite: {
    "ui:placeholder": "Genre",
    classNames: "input_mesure_civilite",

    "ui:title": "Le majeur à protéger",
    "ui:options": {
      label: true
    }
  },
  ville: {
    "ui:placeholder": "Commune",
    classNames: "input_mesure_ville",
    "ui:options": {
      label: false
    }
  },
  residence: {
    "ui:widget": "radio",
    "ui:placeholder": "Lieu de vie",
    "ui:title": "Résidence",
    classNames: "input_mesure_lieuDeVie",
    "ui:options": {
      label: true
    }
  },
  //TODO(Adrien): discus with PO
  // ti_id: {
  //   "ui:widget": "TisOfMandataireAutoComplete",
  //   "ui:title": "Tribunal instance",
  //   "ui:placeholder": "Ti",
  //   "ui:options": {
  //     label: true
  //   }
  // },
  etablissement_id: {
    "ui:widget": "EtablissementAutoComplete",
    "ui:title": "Etablissement",
    "ui:placeholder": "Etablissement",
    "ui:options": {
      label: true
    }
  },
  numero_dossier: {
    "ui:autofocus": true,
    "ui:title": "Numéro de dossier",
    "ui:options": {
      label: true
    }
  }
};

const TisOfMandataireAutoComplete = ({ items, value, onChange }) => (
  <Autocomplete
    items={items}
    inputProps={{
      style: { width: 300 },
      placeholder: "Choisissez un tis ou vous êtes agrée"
    }}
    resetOnSelect={false}
    value={value}
    onSelect={obj => onChange(obj.id)}
    labelKey={"etablissement"}
  />
);

const EtablissementAutoComplete = ({ items, value, onChange }) => (
  <Autocomplete
    items={items}
    inputProps={{
      style: { width: 500 },
      placeholder: "Choisissez un établissement"
    }}
    resetOnSelect={false}
    value={value}
    onSelect={obj => onChange(obj.id)}
  />
);

// connect autocomplete to redux store finess data
const EtablissementAutoCompleteRedux = connect(state => ({
  items: state.mandataire.finess
}))(EtablissementAutoComplete);

const TisOfMandataireAutoCompleteRedux = connect(state => ({
  items: state.mandataire.tis
}))(TisOfMandataireAutoComplete);

/*
TMPFIX : we need to wrap component due to a bug with react-jsonschema-form widgets and react.memo
introduced in react-redux connect https://github.com/reduxjs/react-redux/releases/tag/v7.0.1
reported here : https://github.com/mozilla-services/react-jsonschema-form/issues/1309
*/
const EtablissementAutoCompleteReduxWrapper = props => (
  <EtablissementAutoCompleteRedux {...props} />
);
const TisOfMandataireAutoCompleteReduxWrapper = props => (
  <TisOfMandataireAutoCompleteRedux {...props} />
);

const widgets = {
  EtablissementAutoComplete: EtablissementAutoCompleteReduxWrapper,
  TisOfMandataireAutoComplete: TisOfMandataireAutoCompleteReduxWrapper
};

const CustomFieldTemplate = props => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    displayLabel,
    description,
    errors,
    children
  } = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>
        {displayLabel ? label : null}
        {required ? null : null}
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
};

const buttonIconStyle = { width: 22, height: 22, marginRight: 5, marginTop: -2 };

const CreateMesure = ({
  onSubmit,
  createMesure,
  mesureCreatedStatus,
  mesureCreatedMessage,
  mandataireId,
  formData = {
    date_ouverture: format(new Date(), "YYYY-MM-DD"),
    mandataire_id: mandataireId
  }
}) => {
  return (
    <ToggleState
      getPromise={() => Promise.resolve()}
      active={false}
      render={({ active, toggle }) => (
        <div style={{ minHeight: 120, padding: 10 }}>
          {(mesureCreatedStatus === "success" && (
            <React.Fragment>
              <Button
                onClick={() => {
                  createMesure();
                }}
                style={{ width: 260, marginLeft: 20 }}
              >
                <PlusSquare style={buttonIconStyle} /> Créer une nouvelle mesure
              </Button>
              <SucessBox message="La mesure a bien été enregistrée" />
            </React.Fragment>
          )) ||
            (active && (
              <React.Fragment>
                <div style={{ fontSize: "1.4em", marginTop: 0, marginLeft: 10 }}>
                  Créer une nouvelle mesure
                </div>
                <Form
                  schema={schema}
                  FieldTemplate={CustomFieldTemplate}
                  uiSchema={uiSchema}
                  formData={formData}
                  onSubmit={onSubmit}
                  widgets={widgets}
                >
                  {mesureCreatedStatus === "error" && (
                    <ErrorBox
                      message={`Impossible d'enregistrer la mesure (${mesureCreatedMessage})`}
                    />
                  )}
                  <div>
                    <Button
                      data-cy="button-submit-mesure"
                      type="submit"
                      style={{ width: 260, marginLeft: 20 }}
                    >
                      <Save style={buttonIconStyle} /> Enregistrer la mesure
                    </Button>
                    <Button
                      error
                      data-cy="button-cancel-submit-mesure"
                      type="button"
                      onClick={toggle}
                      disabled={status === "loading"}
                      style={{ width: 120, marginLeft: 20 }}
                    >
                      <X style={buttonIconStyle} /> Annuler
                    </Button>
                  </div>
                </Form>
              </React.Fragment>
            )) || (
              <>
                <Button
                  data-cy="button-create-mesure"
                  onClick={() => {
                    createMesure();
                    toggle();
                  }}
                  style={{ marginTop: 30, width: 260 }}
                >
                  <PlusSquare style={buttonIconStyle} /> Créer une nouvelle mesure
                </Button>
                <Button
                  onClick={() => Router.push("/mandataires/import-mesures")}
                  style={{ marginTop: 30, width: 260 }}
                >
                  <PlusSquare style={buttonIconStyle} /> Importer vos mesures
                </Button>
              </>
            )}
        </div>
      )}
    />
  );
};

const mapStateToProps = state => ({
  mesureCreatedStatus: state.mesures.mesureCreatedStatus,
  mesureCreatedMessage: state.mesures.mesureCreatedMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { createMesure, onSubmit: ({ formData }) => createMesureSave(formData) },
    dispatch
  );

// connect to redux store actions
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMesure);
