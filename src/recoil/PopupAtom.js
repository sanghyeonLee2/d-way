import {atom} from "recoil";

export const PopupAtom = atom({
    key: "PopupAtom", //key는 전역적으로 유일해야 함
    default: false//useState([]) 와 같음
})
