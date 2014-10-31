/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var node1;
var node;
var edge;
var div_id = "cytoscapeweb";
function display(){
    
    
    request = new XMLHttpRequest();
    
    request.open("GET", "JsonServlet",true);
    request.send();
    
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var text = request.responseText;
            var obj = JSON.parse(text);
            var user2=obj.Followers[0];
            var userID = obj.myId;
            //document.getElementById("data").innerHTML = obj.toString();
             //var node = "[{id: \""+userID+"\"},";
              node1 = [{id: userID.toString()},{id:userID.toString()}];
             node1.push({id: userID.toString()});
              node = [{id: userID.toString()}];
            // node.push({id:"1"});
             //var str = userId.toString() + "to" + user2.toString();
              edge = [{id: userID.toString()+"to"+ userID.toString(),source:userID.toString(), target:userID.toString()}];
             for(i=0;i<obj.Followers.length;i++){
                 node.push({id: obj.Followers[i].toString()});
                 edge.push({id: userID.toString()+"to"+obj.Followers[i].toString(),source:userID.toString(),
                         target:obj.Followers[i].toString()});
             }
             
            //console.log(JSON.stringify(node));
        // document.getElementById("data").innerHTML = node;
            var networ_json = {
                    data: {
                      nodes: node,
                     edges: edge
                    }
             };
                    
//                var networ_json = {
//                    data: {
//                       
//                      nodes: [ { id: "1" }, { id: "2" }, { id: "3" } ],
//                     edges: [ { id: "1to2", target: "1", source: "2" } ]
//                     
//                    }
//             };
             var options = {
                    // where you have the Cytoscape Web SWF
                    swfPath: "CytoscapeWeb",
                    // where you have the Flash installer SWF
                    flashInstallerPath: "playerProductInstall"
                };
                
                var vis = new org.cytoscapeweb.Visualization(div_id, options);
                
                vis.ready(function(){
                    vis.addListener("click", "nodes", function(event){
                        handle_click(event);
                    });
                     function handle_click(event){
                        var target = event.target;
                        document.getElementById("userid").value = target.data.id;
                        document.getElementById("output").innerHTML = target.data.id;
                     }       
                });
                
                vis.draw({ network: networ_json });
        }
    
};
}

function query(){
    var userID = document.getElementById("userid").value;
    query1 = new XMLHttpRequest();
    query1.open("GET", "QueryServlet?userId="+userID,true);
    query1.send();
    document.getElementById("output").innerHTML = query1.status.toString();
    
    query1.onreadystatechange = function(){
        
   
    if(query1.readyState == 4 && query1.status == 200){
        var text = query1.responseText;
            var obj = JSON.parse(text);
            document.getElementById("output").innerHTML = text;
           // var node;
           // var edge;
           userID = obj.queriedId;
            for(i=0;i<obj.Followers.length;i++){
                
                if(JSON.stringify(node).indexOf(obj.Followers[i].toString())==-1){
                    document.getElementById("output").innerHTML = "Reached if";
                 node.push({id: obj.Followers[i].toString()});
                 edge.push({id: userID.toString()+"to"+obj.Followers[i].toString(),source:userID.toString(),
                         target:obj.Followers[i].toString()});
                 }
                 else{
                     document.getElementById("output").innerHTML = node.indexOf(obj.Followers[i]);
                     edge.push({id: userID.toString()+"to"+obj.Followers[i].toString(),source:userID.toString(),
                         target:obj.Followers[i].toString()});
                 }
             }
           // document.getElementById("output").innerHTML = JSON.stringify(node);
             var networ_json = {
                    data: {
                      nodes: node,
                     edges: edge
                    }
             };
             var options = {
                    // where you have the Cytoscape Web SWF
                    swfPath: "CytoscapeWeb",
                    // where you have the Flash installer SWF
                    flashInstallerPath: "playerProductInstall"
                };
                
                var vis = new org.cytoscapeweb.Visualization(div_id, options);
                vis.ready(function(){
                    vis.addListener("click", "nodes", function(event){
                        handle_click(event);
                    });
                     function handle_click(event){
                        var target = event.target;
                        document.getElementById("userid").value = target.data.id;
                        document.getElementById("output").innerHTML = target.data.id;
                     }       
                });
            vis.draw({ network: networ_json });
    }
    };

}

window.onload=function(){
    
    document.getElementById("sub").onclick=display;
    document.getElementById("search").onclick = query;
    
};
