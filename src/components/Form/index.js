import { useState, useEffect } from "react";
import styles from "./form.module.scss";
import CardList from "../CardList";
import client from '../../config/HttpClient';
import { API_URL, LABEL, ERROR, MANDATORY_ERROR, API_ERROR, SUCCESS_MSG } from "../../config/constants";

const Form = () => {
  const [selectedUserId, setSelectedUserId] = useState();
  const [errorMessage, setErrorMessage] = useState(ERROR);
  const [apiError, setApiError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [titleErrorMsg, setTitleErrorMsg] = useState();
  const [bodyErrorMsg, setBodyErrorMsg] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const submitForm = async () => {
    try {
      await client.post(`${API_URL}/posts`, {
        data: {
          title: title,
          body: body,
          userId: selectedUserId
        }
      });
      setSuccessMsg(SUCCESS_MSG);
    } catch {
      setApiError(API_ERROR);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
      !title && setTitleErrorMsg(MANDATORY_ERROR);
      !body && setBodyErrorMsg(MANDATORY_ERROR);
      return false;
    }

    submitForm();
  };

  useEffect(() => {
    title && setTitleErrorMsg();
    body && setBodyErrorMsg();
  }, [title, body]);

  const handleValidation = (id) => {
    if (id) {
      setSelectedUserId(id);
      setErrorMessage('');
    } else {
      setSelectedUserId();
      setErrorMessage(ERROR);
    }
  }

  return (
    <form className={styles.formGroup} onSubmit={handleSubmit}>
      <CardList
        label={LABEL}
        handleChange={handleValidation}
        selectedUserId={selectedUserId}
        error={errorMessage}
      />
      {!!selectedUserId &&
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value?.trim())}
            />
            {!!titleErrorMsg && <span className={styles.error}>{titleErrorMsg}</span>}
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <input
              type="text"
              id="body"
              placeholder="Enter body"
              onChange={(e) => setBody(e.target.value?.trim())}
            />
            {!!bodyErrorMsg && <span className={styles.error} >{bodyErrorMsg}</span>}
          </div>
          <button id="submit" type="submit">Submit</button>
        </div>
      }
      {!!apiError && <span className={styles.error}>{apiError}</span>}
      {!!successMsg && <span className={styles.success}>{successMsg}</span>}
    </form>
  );
};

export default Form;
