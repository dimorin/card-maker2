import { getAuth, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
class AuthService{
    constructor(firebaseApp){
        this.auth = getAuth(firebaseApp);
        this.googleProvider = new GoogleAuthProvider();
        this.githubProvider = new GithubAuthProvider();
    }
    login(providerName){
        const authProvider = this.getProvider(providerName);
        return signInWithPopup(this.auth, authProvider);
    }
    logout(){        
        signOut(this.auth);
    }
    onAuthChange(callback){
        // login 상태가 변하면 callback을 실행하라
        onAuthStateChanged(this.auth, callback);        
    }
    getProvider(providerName){
        switch(providerName){
            case 'Google':
                return this.googleProvider;
            case 'Github':
                return this.githubProvider;
            default:
                throw new Error(`not supported provider:${providerName}`);
        }
    }
}

export default AuthService;