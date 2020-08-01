import React from "react";

/** Object type to store word with count*/
type customString = {
    value:string, 
    count: number
};

interface IState {
    inputString :string,
    bannedWords :string,
    output :string
  }

class OccurrenceComponent extends React.Component<{},IState,customString> {

    constructor(props:any) {
        super(props);
        this.state = {
            inputString :"",
            bannedWords :"",
            output :""
        };
      }

      /**Funtion to handle change in input string */
    handleInputStringChange = (event: React.FormEvent<HTMLTextAreaElement>) =>{
        event.preventDefault();
        var input = (event.target as HTMLTextAreaElement).value;
        this.setState({inputString:input});
    }

    /**Funtion to handle change in banned words */
    handleBannedWordsChange = (event: React.FormEvent<HTMLTextAreaElement>) =>{
        event.preventDefault();
        var input = (event.target as HTMLTextAreaElement).value;
        this.setState({bannedWords:input});
    }


    /** Function to find words with highest occerrences */
     findHighestOccurence = (event:React.FormEvent<HTMLFormElement>, inputArray:Array<string>, bannedWordsArry:Array<string>) => {

        event.preventDefault();
        var outputArray = inputArray.reduce(function(acc:customString[], cur:string, ind:number, arr:string[]):customString[] {
                /** To check first occerence of word */
                if (arr.indexOf(cur) === ind) {
                    return [...acc, {value:cur, count: 1}];
                } 
                /** If word is olready present in accumlator array  */
                else {
                    //Find current word in accumulator array
                    var currentValue = acc.find(e => e.value === cur);
                    if(typeof currentValue!== 'undefined'){
                        //Increment count of current word
                        acc[acc.indexOf(currentValue)] = {value:cur, count: acc[acc.indexOf(currentValue)].count + 1};
                    }              
                    return acc;
                }
            }, [])
            /** Sort array in desending order */
            .sort((a, b) => b.count - a.count)
            /** To check if array contains banned words */
            .filter((cur) => bannedWordsArry.indexOf(cur.value) === -1)
            /** To filter words with highest occurence */
            .filter((cur, ind, arr) => cur.count === arr[0].count)
            .map(cur => cur.value);        
                
            this.setState({output: outputArray.join(", ")});
        
        };

    
    
    render() {

        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        /** regex to remove punctuations */
        let inputString = this.state.inputString.replace(regex, '');

        let inputArray = inputString.toLowerCase().split(" ");
        let bannedWordsArry =this.state.bannedWords.toLowerCase().split(/[\s,]+/);

       return (
        <div className="registration-form">
            <form onSubmit={(e)=>this.findHighestOccurence(e,inputArray,bannedWordsArry)}>
                <div className="form-group">
                    <textarea  className="form-control item inputString"value={this.state.inputString} placeholder="Input String" onChange={(e)=>this.handleInputStringChange(e)}/>
                </div>
                <div className="form-group">
                    <textarea  className="form-control item banned" id="password" placeholder="Banned Words" onChange={(e)=>this.handleBannedWordsChange(e)}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block create-account" >Submit</button>
                </div>
                <div className="form-group">
                  <textarea  className="form-control item output" defaultValue={this.state.output} id="password" placeholder="Output"/>
                </div>
            </form>
        </div>
      );
    };  
};

export default OccurrenceComponent;
