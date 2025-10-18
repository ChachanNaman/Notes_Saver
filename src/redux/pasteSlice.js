import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")
  ?     JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {

        const paste = action.payload;

        //add a check if paste already there , means title same then warn 

        //now i want to push current notes in my all previous notes , soo i have already in my local storage and saved in list named "pastes"
        state.pastes.push(paste);
        //just pushed in queue not in localStorage
    
        //
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
       
        //now showing message is created by [react hot Toast npm]
        toast("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
        const paste = action.payload; //loaded paste
        const index = state.pastes.findIndex((item) => item._id == paste._id); //search for id
        //if id already there then will return some +ve value otherwise -ve 
        //soo if +ve id then 
        if(index >=0){
            state.pastes[index] = paste;

            localStorage.setItem("pastes" , JSON.stringify(state.pastes));

            toast.success("Paste Updates");
        }

    },
    resetAllPastes: (state, action) => {
        state.pastes = []; //empty array of state

        localStorage.removeItem("pastes"); //empty local storage also
    },
    removeFromPastes: (state, action) => {
        //get the id of that paste i want to remove
        //if found then remove that state , and update local storage and thrown message that updated 
        const pasteID = action.payload; //loaded paste

        console.log(pasteID);
        const index = state.pastes.findIndex((item) => item._id === pasteID);

        if(index>=0){
            state.pastes.splice(index, 1);

            localStorage.setItem("pastes" , JSON.stringify(state.pastes));

            toast.success("Paste deleted ! ");

        }


    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer