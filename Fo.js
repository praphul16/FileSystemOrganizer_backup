
const help =require('./commands/help')
const organize=require('./commands/organize')
const tree=require('./commands/tree.js')
const fs=require('fs')
const path=require('path')

let inputArr =process.argv.slice(2)
command=inputArr[0];





switch(command)
{
 case 'tree':
    tree.treeKey(inputArr[1])
     break;

     case 'organize':
         organize.organizeKey(inputArr[1])
         break;
         case 'help':
             help.helpKey();
             break;
        default :
        console.log('please enter valid command');
}


 



