var btnArr= document.getElementsByClassName("btn");
var i=0;
var btnlength=btnArr.length;
var spaceX={
	"launch":"",
	"land":"",
	"year":"",
	"eventHandler":function(){
		var urlstr="https://api.spaceXdata.com/v3/launches?limit=100";
		if(this!==spaceX){
			spaceX.removeActiveClass();
			urlstr+=spaceX.setUrl(this);
		}
		axios.get(urlstr).then(function(response){
 			document.getElementById("item-container").innerHTML= spaceX.cardHtml(response.data);
		});
	},
	"cardHtml":function(data){
		var datalength=data.length;
		var i=0;
		var htmlString="";
		var missionIdStr;
		var missionIdLength;
		var j;
		while(i<datalength){
			missionIdStr="";
			missionIdLength=data[i]['mission_id'].length;
			j=0;
			while(j<missionIdLength){
				missionIdStr+=`
					<li>`+data[i]['mission_id'][j]+`</li>
				`;
				j++;
			}
			/**/
			htmlString+=`
				<div class="flex-item">
				   	<div class="container">
				   		<div class="imgclass">
					   		<img src="`+data[i]['links']['mission_patch_small']+`" alt="img" style="width:100%;"/>
					   	</div>
				   		<p class="primary-color"><b>`+data[i]['mission_name']+` #`+data[i]['flight_number']+`</b></p>
				   		<p>Mission Ids</p>
				   		<ul class="primary-color">
				   			`+missionIdStr+`
				   		</ul>
				   		<label>Launch Year:<span class="primary-color">`+data[i]['launch_year']+`</span></label><br/>
				   		<label>Successful Launch:<span class="primary-color">`+data[i]['launch_success']+`</span></label><br/>
				   		<label>Successful Landing:<span class="primary-color">`+data[i]['rocket']['first_stage']['cores'][0]['land_success']+`</span></label>
				    </div>
			    </div>  
		`;
		i++;
		}
		return htmlString;
	},
	"removeActiveClass":function(){
		var yearBtns=document.getElementsByClassName("data-year");
		var launchBtns=document.getElementsByClassName("data-launch");
		var landBtns=document.getElementsByClassName("data-land");
		if(yearBtns!==null){
			var yearBtnsLength=yearBtns.length;
			var j=0;
			while(j<yearBtnsLength){
				yearBtns[j].classList.remove("active");
				j++;
			}
		}
		if(launchBtns!==null){
			var launchBtnsLength=launchBtns.length;
			var j=0;
			while(j<launchBtnsLength){
				launchBtns[j].classList.remove("active");
				j++;
			}
		}
		if(landBtns!==null){
			var landBtnsLength=landBtns.length;
			var j=0;
			while(j<landBtnsLength){
				landBtns[j].classList.remove("active");
				j++;
			}
		}
	},
	"setUrl":function(sel){
		var urlstr=""
		if(sel.getAttribute("data-launch")!==null){
			spaceX.launch=sel.getAttribute("data-launch");
		}
		if(sel.getAttribute("data-land")!==null){
			spaceX.land=sel.getAttribute("data-land");
		}
		if(sel.getAttribute("data-year")!==null){
			spaceX.year=sel.getAttribute("data-year");
		}

		if(spaceX.launch!==null && spaceX.launch!==""){
			document.getElementsByClassName("data-launch"+spaceX.launch)[0].classList.add("active");
			urlstr+="&launch_success="+spaceX.launch;
		}
		if(spaceX.land!==null && spaceX.land!==""){
			document.getElementsByClassName("data-land"+spaceX.land)[0].classList.add("active");
			urlstr+="&land_success="+spaceX.land;
		}
		if(spaceX.year!==null && spaceX.year!==""){
			document.getElementsByClassName("data-year"+spaceX.year)[0].classList.add("active");
			urlstr+="&launch_year="+spaceX.year;
		}
		return urlstr;
	}
};
while(i < btnlength){
	btnArr[i].addEventListener("click",spaceX.eventHandler);
	i++;
}
spaceX.eventHandler();