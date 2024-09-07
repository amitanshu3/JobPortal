import { createContext, useState } from 'react';
import run from '../config/Gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setinput] = useState('');
    const [recentprompt, setrecentprompt] = useState('');
    const [previousprompt, setpreviousprompt] = useState([]);
    const [showresult, setshowresult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [resultData, setresultData] = useState('');

    const delaypara = (index, nextword) => {
        setTimeout(() => {
            setresultData(prev => prev + nextword);
        }, 75 * index);

    }
    const newchat=()=>{
        setLoading(false);
        setshowresult(false);
    }


    const onSent = async (prompt) => {
        setresultData("");
        setLoading(true)
        setshowresult(true)
        let response;
        if(prompt!== undefined){
            response=await run(prompt)
            setrecentprompt(prompt)
        }
        else{
            setpreviousprompt(prev=>[...prev,input])
            setrecentprompt(input)
            response= await run(input)
        }
        // setrecentprompt(input);
        // setpreviousprompt(prev=>[...prev,input])
        // const response = await run(input);
        let responseArray = response.split('**');
        let newResponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newresponseArray = newResponse2.split(" ");
        for (let i = 0; i < newresponseArray.length; i++) {
            const nextword = newresponseArray[i];
            delaypara(i, nextword + " ");
        }
        setLoading(false);
        setinput("");
    };

    const contextValue = {
        previousprompt,
        input,
        recentprompt,
        showresult,
        Loading,
        resultData,
        onSent,
        setinput,
        setrecentprompt,
        setpreviousprompt,
        newchat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
