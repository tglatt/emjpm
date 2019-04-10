import React from "react";

import apiFetch from "../communComponents/Api";
import styled from "styled-components";
import { lighten } from "@wessberg/color";

const Input = styled.input`
  background: "#00000";
  border: 1px solid;
  height: 40px;
  width: auto;
  text-align: center;
  color: black;
  padding: 0 15px;
  border-radius: 3px;
  box-shadow: 2px 2px 1px #c0c0c0;
  font-size: 1.1em;
  margin: 5px;
  cursor: pointer;
  svg {
    vertical-align: middle;
  }
`;

class ImportCV extends React.Component {
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    if (this.file) {
      this.fileUpload(this.file.files[0]);
    }
  };

  fileUpload = file => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch(`/mandataires/upload`, {
      method: "POST",
      body: formData
    }).catch(e => {
      alert("Impossible de uploader le Curriculum Vitae");
      throw e;
    });
  };

  render() {
    return (
      <>
        <h2>CV à l'intention des juges </h2>
        <div>
          Votre Cv: <a href={`${process.env.PATH_FILE_NAME}/${this.props.cv}`}> {this.props.cv} </a>
        </div>
        <form onSubmit={this.onFormSubmit}>
          Télécharger son Cv:
          <Input ref={node => (this.file = node)} type="file" onChange={this.onFormSubmit} />
        </form>
      </>
    );
  }
}

export default ImportCV;
