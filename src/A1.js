import React from 'react';
import './index.css';
import Papa from 'papaparse';
import csvFile from './matches.csv';
import moment from 'moment';
let records=[];
Papa.parse(csvFile, {
    download: true,
    complete: function (input) {
         records = input.data;
        //  console.log(records);
    }
});
// console.log(records);
export default function A1(){
    
    return (
        
        <div>
            <div id="heading1">Welcome to the history of IPL</div>
            
            <div id="search_by_date" class="inputt">
            <div>Search By Dates</div>
            <div id="search_by_date1">Please enter the date of the match: 
            <input type="date" id="date11" placeholder='13-05-2000'></input></div>
            <div><button type="button" onClick={function(){
                let date1=document.getElementById('date11').value;
                let res="";
                let y=0,x=0,z=-1;
                for(let i=0;i<records.length;i++){
                    if(moment(date1).format('DD-MM-YYYY')===records[i][3]){
                        y++;
                        z=i;
                        console.log("data is present");
                        if(i+1<records.length){
                            if(moment(date1).format('DD-MM-YYYY')===records[i+1][3]){
                                x=1;
                                continue;
                            }
                            else{
                                break;
                            }
                        }
                        if(x){
                            continue;
                        }
                        break;
                    }

                }
                if(z===-1){
                    res="There was no match as that day."
                }
                else{
                    if(y===1){
                        res="There was 1 match at that day."+"<br/>";
                    }
                    else{
                        res="There were "+y+" matches at that day."+"<br/>";
                    }
                    for(let i=z;i<z+y;i++){
                        let s1="A match between "+records[i][4] +" and "+records[i][5]+" in the city "+records[i][2] + " in which "+records[i][6]+" won the toss and decided to chose to "+records[i][7]+".";
                        let s2="";
                        if(records[i][8]==="tie"){
                            s2=" The match was tie." ;
                        }
                        else{
                            if(records[i][11]>0){
                                s2=" "+records[i][10]+" won by "+records[i][11]+" runs."
                            }
                            else{
                                s2=" "+records[i][10]+" won by "+records[i][12]+" wickets."
                            }
                        }
                        res+=(s1+s2)+"<br/>";
                        
                    }
                }
                
                document.getElementById('mes1').innerHTML=res;
                console.log(date1);
            }}>Search</button></div></div>
            <div id="mes1" class="res1"></div>


            <div class="inputt">
                <div>Search By Teams</div>
            <div id="search_by_team">Enter the name of the team: 
            <input id="input2" type="text" placeholder='Mumbai Indians'></input></div>
            <div>
                <label for="years">Choose a year: </label>

                <select id="years" name="years">
                <option value="all">From 2008-2017</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                </select>
                
                </div>
                <div><button id="button2" type="button" onClick={function(){
                    let team_name=document.getElementById('input2').value;
                    let year2=document.getElementById('years').value;
                    console.log(team_name,year2);

                    let number_of_matches=0,number_of_wins=0,number_of_loses=0,number_of_ties=0;
                    for(let i=0;i<records.length;i++){
                        if(parseInt(year2)>=2008 && parseInt(year2)<=2017){
                            if(parseInt(records[i][1])===parseInt(year2)&&(records[i][4]===team_name||records[i][5]===team_name)){
                                number_of_matches++;
                                if(records[i][8]==="tie"){
                                    number_of_ties++;
                                }
                                else{
                                    if(records[i][10]===team_name){
                                        number_of_wins++;
                                    }
                                    else{
                                        number_of_loses++;
                                    }
                                }
                            }
                        }
                        else{
                            if(records[i][4]===team_name||records[i][5]===team_name){
                                number_of_matches++;
                                if(records[i][8]==="tie"){
                                    number_of_ties++;
                                }
                                else{
                                    if(records[i][10]===team_name){
                                        number_of_wins++;
                                    }
                                    else{
                                        number_of_loses++;
                                    }
                                }
                            }
                        }
                    }
                    let res="";
                    if(number_of_matches===0){
                        res="There was no match with this team name in that year!"
                    }
                    else{
                        res="Number of Matches: "+number_of_matches+"<br/>";
                        res+="Number of Wins: "+number_of_wins+"<br/>";
                        res+="Number of Loses: "+number_of_loses+"<br/>";
                        res+="Number of Ties: "+number_of_ties;
                    }
                    document.getElementById('aps1').innerHTML=res;

                }}>Search</button></div>
                
            </div>
            <div id="aps1" class="res1"></div>
        </div>
    );
}