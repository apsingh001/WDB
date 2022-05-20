import React from 'react';
import './index.css';
import Papa from 'papaparse';
import csvFile1 from './matches.csv';
import csvFile2 from './Ball_by_Ball.csv';
import csvFile3 from './Match.csv';
import csvFile4 from './Player_Match.csv';
import csvFile5 from './Player.csv';
import csvFile6 from './Season.csv';
import csvFile7 from './Team.csv';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart }            from 'react-chartjs-2';

// Chart.register(CategoryScale);


let records=[];
Papa.parse(csvFile1, {
    download: true,
    complete: function (input) {
         records = input.data;
    }
});
console.log(records,"ABHAYA");
let Ball_by_Ball=[];
Papa.parse(csvFile2, {
    download: true,
    complete: function (input) {
         Ball_by_Ball = input.data;
    }
});


let Match=[];
Papa.parse(csvFile3, {
    download: true,
    complete: function (input) {
         Match = input.data;
    }
});

let Player_Match=[];
Papa.parse(csvFile4, {
    download: true,
    complete: function (input) {
        Player_Match = input.data;
    }
});

let Player=[];
Papa.parse(csvFile5, {
    download: true,
    complete: function (input) {
        Player = input.data;
    }
});

let Season=[];
Papa.parse(csvFile6, {
    download: true,
    complete: function (input) {
        Season = input.data;
    }
});

let Team=[];
Papa.parse(csvFile7, {
    download: true,
    complete: function (input) {
        Team = input.data;
    }
});

let run_array_per_over1=Array(20).fill(0);
let run_array_per_over2=Array(20).fill(0);

let yaxiss=[];
for(let i=1;i<=20;i++){
    yaxiss.push(i);
}

let Team1=-1;
let Team2=-1;
let Toss_won=-1;
let Opt_to=-1;
let Winning_team="";
let Match_ID=-1;
let TeamName1="";
let TeamName2="";
let runs1=0;
let runs2=0;
let wickets1=0;
let wickets2=0;
let overs1=0;
let overs2=0;
let RR1=0;
let RR2=0;
let pEleven1=[];
let pEleven2=[];
let pEleven11="";
let pEleven22="";
let toss1="";
let decision1="";
let venue1="";
let fUmpire1="";
let sUmpire1="";
let mOfM="";
export default function A2(){
    const[a1,setA1]=React.useState(0);
    console.log(a1);
    if(a1===0){
    return (
        <div>
            <div class ="inputt" id="aa2">
            <div id="aa1">Search data using one of the given options: either by searching the date or by team name</div>
            <div>Search by date: <button type='button' onClick={function(){
                setA1(1);
                // console.log(Ball_by_Ball);

            }}> Search </button></div></div>
            <div class="inputt">
            <div>Search by Team: <button type='button' onClick={function(){
                setA1(2);
                // console.log(a1);

            }}> Search </button></div></div>
            
        </div>
    )}
    else if(a1===1){
        return(
            <div>
            <div></div>
            
            <div id="search_by_date" class="inputt">
            <div>Search By Dates</div>
            <div id="search_by_date1">Please enter the date of the match: 
            <input type="date" id="date11" placeholder='13-05-2000'></input></div>
            <div><button type="button" onClick={
                function(){
                    let date1=document.getElementById('date11').value;
        console.log(date1);
        let res="";
        let y=0,x=0,z=-1;
        Match_ID=-1;
        
        for(let i=0;i<Match.length;i++){
            // console.log(moment(date1).format('DD-MMM-YY'),Match[i][1]);
            if(moment(date1).format('DD-MMM-YY')===Match[i][1]){
                Match_ID=Match[i][0];
                console.log(Match_ID);
                // Team1=Match[i][2];
                // Team2=Match[i][3];
                Toss_won=Match[i][6];
                Opt_to=Match[i][7];
                Winning_team=Team[Match[i][13]][1]+" won by ";
                if(Match[i][11]==="by runs"){
                    Winning_team+=(Match[i][12]+" runs");
                }
                else{
                    Winning_team+=Match[i][12]+" wickets";
                }
                toss1=Team[Match[i][6]][1];
                decision1=Match[i][7];
                venue1=Match[i][5]+", "+Match[i][17]+", "+Match[i][18];
                fUmpire1=Player[Match[i][15]][1];
                sUmpire1=Player[Match[i][16]][1];
                mOfM=Player[Match[i][14]][1];
                break;
            }
        }
        if(Match_ID===-1){
            res="There is no match !!!";
            setA1(3);
        }
        else{
        
        console.log(TeamName1,TeamName2);
        
        console.log(typeof(run_array_per_over1[0]),run_array_per_over2[0]);
        for(let i=0;i<Ball_by_Ball.length;i++){
            if(Ball_by_Ball[i][0]===Match_ID){
                let b1=parseInt(Ball_by_Ball[i][10]);
                let b2=parseInt(Ball_by_Ball[i][12]);
                    if(isNaN(b2)){
                        b2=0;
                    }
                let b3=parseInt(Ball_by_Ball[i][13]);
                    if(isNaN(b3)){
                        b3=0;
                    }
                    else{
                        b3=1;
                    }
                let b4=parseInt(Ball_by_Ball[i][3]);
                let b5=parseInt(Ball_by_Ball[i][2]);
                if(Ball_by_Ball[i][11]===' ' ||Ball_by_Ball[i][11]==="legbyes"){
                    b4=b4;
                }
                else{
                    b4-=1;
                }

                if(Ball_by_Ball[i][1]==='1'){
                    Team1=Ball_by_Ball[i][4];
                    run_array_per_over1[parseInt(Ball_by_Ball[i][2])-1]+=(b1+b2);
                    runs1+=(b1+b2);
                    wickets1+=b3;
                    if(b4!==6){
                        b5-=1;
                        overs1=b5+"."+b4;
                        let b6=parseFloat(b5+"."+b4/6);
                        RR1=(runs1/b6).toFixed(2);

                    }
                    else{
                        overs1=b5;
                        RR1=(runs1/b5).toFixed(2);
                    }
                    // console.log(typeof(Ball_by_Ball[i][2]));
                }
                else{
                    Team2=Ball_by_Ball[i][4];
                    run_array_per_over2[parseInt(Ball_by_Ball[i][2])-1]+=(b1+b2);
                    runs2+=(b1+b2);
                    wickets2+=b3;
                    console.log(b3);
                    if(b4!==6){
                        b5-=1;
                        overs2=b5+"."+b4;
                        let b6=parseFloat(b5+"."+b4/6);
                        RR2=(runs2/b6).toFixed(2);
                    }
                    else{
                        overs2=b5;
                        RR2=(runs2/b5).toFixed(2);
                    }
                    // console.log(typeof(Ball_by_Ball[i][10]));
                }
            }
        }
        TeamName1=Team[Team1][1];
        TeamName2=Team[Team2][1];

        for(let i=0;i<Player_Match.length;i++){
            if(Player_Match[i][0]===Match_ID){
                if(Team1===Player_Match[i][2]){
                    pEleven1.push(Player[Player_Match[i][1]][1]);
                }
                else{
                    pEleven2.push(Player[Player_Match[i][1]][1]);
                }
            }
        }
        for(let i=0;i<10;i++){
            pEleven11+=pEleven1[i]+", ";
            pEleven22+=pEleven2[i]+", ";
        }
        pEleven11+=pEleven1[10];
        pEleven22+=pEleven2[10];

        // console.log(run_array_per_over1,run_array_per_over2);
        setA1(4);
        }
        
        // document.getElementById('mes1').innerHTML=res;
        console.log(date1);
        
        }
            }>Search</button>&nbsp;

            <button type="button" onClick={function(){
                setA1(0);
            }}>Prev</button>
            </div></div>
            <div id="mes1" class="res1"></div>
            
            </div>
        )
    }
    else if(a1===2){
        return(
            <div>
                <div></div>
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

                }}>Search</button>&nbsp;
                <button type="button" onClick={function(){
                setA1(0);
            }}>Prev</button></div>
                
            </div>
            <div id="aps1" class="res1"></div>
            </div>
        )
    }
    else if(a1===3){
        return(
            <div>
            <div></div>
            
            <div id="search_by_date" class="inputt">
            <div>Search By Dates</div>
            <div id="search_by_date1">Please enter the date of the match: 
            <input type="date" id="date11" placeholder='13-05-2000'></input></div>
            <button type="button" onClick={function(){
                setA1(1);
            }}>Prev</button>
            </div>
            <div id="nf">Match Not Found</div>
            </div> 
        )
    }
    else if(a1===4){
        return(
            <div>
            <div></div>
            
            <div id="search_by_date" class="inputt">
            <div>Search By Dates</div>
            <div id="search_by_date1">Please enter the date of the match: 
            <input type="date" id="date11" placeholder='13-05-2000'></input></div>
            <button type="button" onClick={function(){
                Team1=-1;
                Team2=-1;
                Toss_won=-1;
                Opt_to=-1;
                Winning_team="";
                Match_ID=-1;
                TeamName1="";
                TeamName2="";
                runs1=0;
                runs2=0;
                wickets1=0;
                wickets2=0;
                overs1=0;
                overs2=0;
                setA1(1);
                run_array_per_over1=Array(20).fill(0);
                run_array_per_over2=Array(20).fill(0);
                pEleven1=[];
                pEleven2=[];
                pEleven11="";
                pEleven22="";
            }}>Prev</button>
            <div class="Heading1">Match</div>
            <div class="Heading2">{TeamName1} vs {TeamName2},</div>
            <div class="Heading3">Indian Premier League</div>
            <div class="Heading6">{Winning_team}</div>
            <div class="toss">
            <div class="Heading4">Man Of the Match</div>
            <div class="Heading5">{mOfM}</div></div>
            <div class="toss">
            <div class="Heading4">Toss</div>
            <div class="Heading5">{toss1} won the toss and opt to {decision1}</div></div>
            <div class="toss">
            <div class="Heading4">Venue</div>
            <div class="Heading5">{venue1}</div></div>
            <div class="toss">
            <div class="Heading4">Umpires</div>
            <div class="Heading5">{fUmpire1+", "}{sUmpire1}</div></div>
            <div class="TeamName">Team 1: {TeamName1}({runs1}/{wickets1})</div>
            <div class="aaa1">
            <div class="left1">
            <div class="Total1">
            <div>Total {runs1}</div> 
            <div>({overs1} ovrs, {wickets1} Wkts) RR {RR1}</div></div> 
            <div class="Playing1">Playing Team: {pEleven11}</div> 
            </div>
            <div class="right1" style={{ maxWidth: "650px" }}>Runs Per Over<Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: yaxiss,
            datasets: [
              {
                // Label for bars
                label: "Runs/Over",
                // Data or value of your each variable
                data: run_array_per_over1,
                // Color of each bar
                backgroundColor: ["green"],
                // Border color of each bar
                borderColor: ["green"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={200}
        /></div> </div>

        <div class="TeamName">Team 2: {TeamName2}({runs2}/{wickets2})</div>
        <div class="aaa1">
        <div class="left1">
        <div class="Total1">
        <div>Total {runs2}</div> 
        <div>({overs2} ovrs, {wickets2} Wkts) RR {RR2}</div></div>
        <div class="Playing1">Playing Team: {pEleven22}</div>
        </div>
            <div class="right1" style={{ maxWidth: "650px" }}> Runs Per Over<Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: yaxiss,
            datasets: [
              {
                // Label for bars
                label: "Runs/Over",
                // Data or value of your each variable
                data: run_array_per_over2,
                // Color of each bar
                backgroundColor: ["blue"],
                // Border color of each bar
                borderColor: ["blue"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={200}
        /></div></div>

            </div>
            </div>
        )
    }

}