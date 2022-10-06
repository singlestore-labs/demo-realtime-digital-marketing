import {
    connectionDatabase,
    connectionHost,
    connectionPassword,
    connectionUser,
} from "@/data/recoil";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

export function usePortalConnection() {
    const [_host, setHost] = useRecoilState(connectionHost);
    const [_user, setUser] = useRecoilState(connectionUser);
    const [_password, setPassword] = useRecoilState(connectionPassword);
    const [_database, setDatabase] = useRecoilState(connectionDatabase);
    const { search } = useLocation();

    function connect() {
        if (search) {
            const queryParams = new URLSearchParams(search);
            const hostname = queryParams.get("hostname");
            const credentials = queryParams.get("credentials");
            if (hostname) {
                setHost(`https://${hostname}`)
            }
            if (credentials) {
                const decodedCredentials = atob(credentials);
                const { username, password } = JSON.parse(decodedCredentials)
                setUser(username);
                setPassword(password)
            }
            setDatabase("martech")
        }
    }
    return { connect }
}
