
const fs=require('fs')
const path=require('path')
let types = {media: ["mp4", "mkv", "mp3"],
Pictures:["jpg"],
archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
app: ["exe", "dmg", "pkg", "deb"],};

function organizeFn(dirpath)
{  let desPath
   if(dirpath==undefined)
   {
       console.log('Please Enter a valid Directory Path')
        return ;
    }else{ // code for validation if file exist or not
        let doesExist=fs.existsSync(dirpath)//code to check if path exists
    //    console.log(doesExist)

        if(doesExist)
        {
              desPath= path.join(dirpath,'organized_files')

              if(fs.existsSync(desPath)==false)
              {
                  fs.mkdirSync(desPath)
              }else{
                  console.log('This folder already exist')
              }
        } else{
            console.log('Please enter a valid path')
        }
         organizeHelper(dirpath,desPath); 
       
    }}

function organizeHelper(src,dest){
    let childNames =fs.readdirSync(src);// get all the files and folders inside the source
   //console.log(childNames)
   for(let i=0; i<childNames.length;i++)
   {
       let chilAddress =path.join(src,childNames[i])
       let isFile =fs.lstatSync(chilAddress).isFile() // to check if it is file or directory
      // console.log(chilAddress+"  "+isFile)
         
       if(isFile)
       {
           let fileCategory = getCategory(childNames[i])
           console.log(childNames[i]+" belongs to "+ fileCategory)
          sendFiles(chilAddress,dest,fileCategory)
       }

   }    
}
function getCategory(name){
  let ext= path.extname(name).slice(1);
//  console.log(ext)    
for( let type in types)
{
    let cTypeArr=types[type]
   // console.log(cTypeArr)
   for(let i=0;i<cTypeArr.length;i++)
   {
       if(ext==cTypeArr[i])
       {
           return type;
       }
   } 

}
 return 'others';
}
function sendFiles(srcFilePath , dest , fileCategory)// to create the file name 
{
    let catPath = path.join(dest, fileCategory);
    if(!fs.existsSync(catPath))
    {
        fs.mkdirSync(catPath);
    }

   let fileName = path.basename(srcFilePath);
   let desPath= path.join(catPath,fileName);

   fs.copyFileSync(srcFilePath,desPath)

   fs.unlinkSync(srcFilePath)// to delete
   
  console.log(fileName+ "is copied to"+ fileCategory );
}
module.exports={
    organizeKey :organizeFn
}