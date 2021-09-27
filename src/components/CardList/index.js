import styles from "./cardList.module.scss";
import { useEffect, useState, Fragment } from "react";
import client from "../../config/HttpClient";
import { API_URL, API_ERROR } from "../../config/constants";

const CardList = (props) => {
  const { label, handleChange, error, selectedUserId } = props;
  const [users, setUsers] = useState([]);
  const [apiError, setApiError] = useState();

  const fetchUsers = async () => {
    try {
      const results = await client.get(`${API_URL}/users`);
      setUsers(results.data);
    } catch {
      setApiError(API_ERROR);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {!!users?.length &&
        <div role="group">
          <label htmlFor="user-list">{label}</label>
          <div id="user-list" aria-label={label} className={styles.cardList}>
            {users.map((user, index) =>
              <Fragment key={user.id}>
                <div
                  tabIndex={0}
                  className={`${styles.card} ${selectedUserId === user.id && styles.selected}`}
                  onClick={() => handleChange(user.id)}
                  onKeyDown={(e) => e.keyCode === 13 && handleChange(user.id)}
                >
                  {user.name}
                </div>
              </Fragment>
            )}
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      }
      {apiError && <div className={styles.error}>{apiError}</div>}
    </div>
  );
};

export default CardList;
