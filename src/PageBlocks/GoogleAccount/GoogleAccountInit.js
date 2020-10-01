import { useGoogleLogin } from 'react-google-login';
import { 
    getClientIp, getRequestToken, GRAPHQL_URL, GOOGLE_CLIENT_ID as googleClientId,
    LOCAL_STORAGE_NAMES, SIGN_IN_METHOD
} from "../../Globals/Config";
import { useDispatch } from 'react-redux';

import { login } from '../../Globals/ReduxStores/UserSlice';

const GoogleAccountInit = () => {
    const dispatch = useDispatch();

    const GOOGLE_SIGN_IN_MUTATION = `mutation LoginWithSocialID($social_id_type: String, $social_id: String, $first_name: String, $last_name: String, $email_id: String, $image_address: String, $client_ip: String, $request_token: String) {
        LoginWithSocialID(social_id_type: $social_id_type, social_id: $social_id, first_name: $first_name, last_name: $last_name, email_id: $email_id, image_address: $image_address, client_ip: $client_ip, request_token: $request_token) {
            message,
            token,
        }
    }`;

    const onSuccess = async (googleSignInResponse) => {

        const googleProfileObj = googleSignInResponse.profileObj;
        console.log('[Signin Success] currentUser (google response): ', googleProfileObj);

        const signInMutationVariables = {
            social_id_type:  SIGN_IN_METHOD.GOOGLE,
            social_id: googleProfileObj.googleId, 
            first_name: googleProfileObj.name,
            last_name: googleProfileObj.familyName,
            email_id: googleProfileObj.email,
            image_address: googleProfileObj.imageUrl,
            client_ip: await getClientIp(),
            request_token: getRequestToken(),
        }

        fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: GOOGLE_SIGN_IN_MUTATION,
                variables: signInMutationVariables,
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response.data.LoginWithSocialID['message'] === "SUCCESS") {
                let token = response.data.LoginWithSocialID['token'];
                localStorage.setItem(LOCAL_STORAGE_NAMES.PREVIOUS_SIGN_IN_METHOD, SIGN_IN_METHOD.GOOGLE);
                localStorage.setItem(LOCAL_STORAGE_NAMES.PREVIOUSLY_SIGNED_IN, true);
                dispatch( login ({
                    ...signInMutationVariables,
                    authorization_token: token,
                }))
            }
            else {
                alert(response.data.LoginMobileAction['message']);
            }
        })
        .catch( err => console.log(err));
    };

    const onFailure = (googleSignInResponse) => {
        console.log('[Login Failed] res:', googleSignInResponse);
    };
    
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: googleClientId,
        isSignedIn: true,
        cookiePolicy: 'none'
    });

    return signIn;
}

export default GoogleAccountInit;