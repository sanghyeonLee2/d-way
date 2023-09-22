import {atom} from "recoil";

export const SignInAtom = atom({
    key:"SignInAtom", //key는 전역적으로 유일해야 함
    default:[]//useState([]) 와 같음
})