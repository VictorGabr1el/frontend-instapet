import React, { useContext } from "react";
import { ImgPerfil } from "../atoms";
// import { Header } from "../organisms";

import { AuthContext } from "../../context/AuthContext";

function User() {
  //   const { user } = useContext(AuthContext);
  return (
    <div className="class_body">
      {/* <Header userSigned={user} /> */}
      <main>
        <div>
          <div>
            <ImgPerfil />
          </div>
          <div>
            <div>
              <div>
                <p>username</p>
              </div>
              <div>
                <button>Editar perfil</button>
              </div>
            </div>
            <div>
              <div>
                <span>0</span> publications
              </div>
              <div>
                <span>0</span> seguidores
              </div>
              <div>
                <span>0</span> seguindo
              </div>
            </div>
            <div>
              <div>
                <p>name</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>PUBLICAÇÔES</p>
        </div>
        <div>
          <div>
            <img></img>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
