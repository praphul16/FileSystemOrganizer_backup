const fs=require('fs')
const path=require('path')

function treeFn(dirpath)
{
 if (dirpath==undefined){
     console.log("please enter a valid command");
 }   
 else{
     let doesExist= fs.existsSync(dirpath);
     if(doesExist){
         treeHelper(dirpath," ")
     }
 }
}


 function treeHelper(targetPath, indent){
     let isFile =fs.lstatSync(targetPath).isFile()
     // here I have checked wheather the target path is file or folder
     if(isFile==true)
      {
        let fileName=path.basename(targetPath)
        console.log(indent+"├──"+fileName)  
        // this will display the files
        
      }  else{// logic for display of  folder
          let  dirName =path.basename(targetPath);
          console.log(indent+`└──`+dirName)   
         
          let children = fs.readdirSync(targetPath)
          //console.log(children);
           
          for(let i=0;i<children.length;i++)//loop for folders and files present inside
          {
              let childPath = path.join(targetPath,children[i])
            treeHelper(childPath, indent+'\t')// calling tree helper for all the children
            }

        }
 
    }
    module.exports={
        treeKey :treeFn
    }