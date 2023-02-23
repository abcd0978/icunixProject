import * as React from 'react';
import Circle from './Circle';
import { useState } from 'react';
import { useEffect } from 'react';
import { cNull } from '../../util/cNull';
export interface ITreeContainerProps {
}

function ParseNumAndStr(data:any){
  if(isNaN(data)){
    return data.length;
  }
  return Number(data);
}

class Node{
  data: string;
  x:number;
  y:number;
  left:Node;
  right:Node;
  parent:Node;
  level:number;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.level = null;
  }
}

class binaryTree{
  head:Node;
  nodeArray:Node[] = [];
  treeLevel:number;
  nodeMap:Map<number,number>;
  newLevelFlag:boolean;
  constructor(){
    this.head = null;
    this.treeLevel = 0;
    this.nodeMap = new Map();
    console.log('생성됨')
  }

  insert_test(node:Node, width:number){
    if(this.head == null){
      this.head = node;
      this.head.x = width/2; // TODO: get width of ViewBox
      this.head.y = 20;
      this.head.level = 0;
    } else {
      
      let temp:Node = this.head;
      while (temp) {

        if (temp.data === node.data) {
          console.log("중복된 노드값을 넣을 수 없음")
          break;
        }

        if(ParseNumAndStr(temp.data) > ParseNumAndStr(node.data)){
          if (temp.left == null) {
            node.parent = temp;
            temp.left = node;
            temp.left.level = temp.level + 1;
            this.treeLevel = Math.max(temp.left.level,this.treeLevel);
            let deltaX:number = (width/2) / Math.pow(2, temp.left.level);
            node.x = temp.x - deltaX;
            node.y = temp.y + 30;
            break;
          } else {
            temp = temp.left;
          }
        }else if(ParseNumAndStr(temp.data) < ParseNumAndStr(node.data)){
          if (temp.right == null) {
            node.parent = temp;
            temp.right = node;
            temp.right.level = temp.level + 1;
            //let nodeLevel:number = this.getLevel(temp.right);
            let deltaX:number = (width/2) / Math.pow(2, temp.right.level);
            this.treeLevel = Math.max(temp.right.level,this.treeLevel);
            node.x = temp.x + deltaX;
            node.y = temp.y + 30;
            break;
          } else {
            temp = temp.right;
          }
        }
      }
    }
    return this;
  }

  insert(node:Node){
    if(this.head == null){
      this.head = node;
      this.head.x = 200; // TODO: get width of ViewBox
      this.head.y = 20;
      this.head.level = 0;
    } else {
      
      let temp:Node = this.head;
      while (temp) {

        if (temp.data === node.data) {
          console.log("중복된 노드값을 넣을 수 없음")
          break;
        }
        if(ParseNumAndStr(temp.data) > ParseNumAndStr(node.data)){
          if (temp.left == null) {
            node.parent = temp;
            temp.left = node;
            temp.left.level = temp.level + 1;
            let deltaX:number = 200/ Math.pow(2,temp.left.level);
            node.x = temp.x - deltaX;
            node.y = temp.y + 30;
            if(cNull(this.nodeMap.get(temp.left.level))===0)
              this.newLevelFlag = true;
            else
              this.newLevelFlag = false;
            let currentLevel = cNull(this.nodeMap.get(temp.left.level))+1;
            this.nodeMap.set(temp.left.level, currentLevel);
            break;
          } else {
            temp = temp.left;
          }
        }else if(ParseNumAndStr(temp.data) < ParseNumAndStr(node.data)){
          if (temp.right == null) {
            node.parent = temp;
            temp.right = node;
            temp.right.level = temp.level + 1;
            let deltaX:number = 200 / Math.pow(2,temp.right.level);
            node.x = temp.x + deltaX;
            node.y = temp.y + 30;
            if(cNull(this.nodeMap.get(temp.right.level))===0)
              this.newLevelFlag = true;
            else
              this.newLevelFlag = false;
            let currentLevel = cNull(this.nodeMap.get(temp.right.level))+1;
            this.nodeMap.set(temp.right.level,  currentLevel);
            break;
          } else {
            temp = temp.right;
          }
        }
      }
    }
    return this;
  }
  
  remove(node:Node){
    
  }



  ToArray(){
    let stack = [];
    this.nodeArray = [];

    if (this.head == null) {
      return;
    }

    stack.push(this.head);
    while (stack.length > 0) {
      let node = stack.pop();
      this.nodeArray.push(node);
      if (node.left != null) {
        stack.push(node.left);
      }
      if (node.right != null) {
        stack.push(node.right);
      }
    }
    return this
  }


  getLevel(node:Node):number{
    // let result = 0;
    // while(node){
    //   node = node.parent;
    //   result++;
    // }
    // return result-1;
    // --node에 level 속성을 추가하여 미사용 --
    return node.level;
  }
  getNodeArray(){
    return this.nodeArray;
  }
  getTreeLevel():number{
    let result:number = 0;
    for(let i=0;i<20;i++){
      this.nodeMap.get(i) > 0 ? result++ : result+=0; 
    }
    return result;
  }
  getNewLevelFlag():boolean{
    this.newLevelFlag ? console.log('새로운 층 노드임') : console.log('기존 층에 생긴 노드임');
    return this.newLevelFlag;
  }
  setHeadXpos(next_x:number):void{ //평행이동, 오류 가능성 높음
    //let different = Math.abs(x/2 - this.head.x);
    let different = Math.abs(next_x - this.head.x);
    let direction:number = (next_x - this.head.x) > 0 ? 1 : -1 ; //현재 새로운 자식노드가 추가되는 경우가 아닌경우 remove로 인식하는 logic 오류 발견
    console.log("remove or add is.. : " + (direction===1 ? "add" : "remove"))
    this.head.x = next_x
    //let direction:number = (this.head.x - x/2) > 0 ? 1 : -1 ;
    console.log("head's x position : " + this.head.x)
    this.parallelMove(this.head, different*direction);
    this.setInterval(this.head,10);
  }
  parallelMove(node:Node,interval:number){
    if(cNull(node)===0)
    return;
    let temp:Node = node;
    if(cNull(temp.left)!==0)
      temp.left.x = temp.left.x+interval;
    if(cNull(temp.right)!==0)
      temp.right.x = temp.right.x+interval;
    if(cNull(temp.left)===0 && cNull(temp.right)===0)
      return;
    this.parallelMove(temp.left,interval);
    this.parallelMove(temp.right,interval);
  }
  setInterval(node:Node,interval:number):void{
    if(cNull(node)===0)
      return;
    let temp:Node = node;
    if(cNull(temp.left)!==0){
      temp.left.x = temp.left.x-interval;
      this.setInterval(temp.left,interval);
    }
    if(cNull(temp.right)!==0){
      temp.right.x = temp.right.x+interval;
      this.setInterval(temp.right,interval);
    }
    if(cNull(temp.left)===0 && cNull(temp.right)===0)
      return;
  }
  
}

function func(prev:string, bnt:binaryTree):string{
  
  let treeLevel = bnt.getTreeLevel()-4;//level5부터 늘릴것이기때문에 -4함.
  console.log("이제 알겠다 너희들의 레벨... : " + treeLevel)
  if(treeLevel > 0 && bnt.getNewLevelFlag()){
    console.log("크기변경 조절")
    let resultString = `0 0 ${400 + (treeLevel*50)} 400`;
    bnt.setHeadXpos((400 + (treeLevel*50))/2);
    return resultString;
  }else{
    return prev;
  }

}

export default function TreeContainer (props: ITreeContainerProps) {
  const width = 600;
  let [bnt,setBnt] = useState<binaryTree>(null);
  let [oneNode,setOneNode] = useState<Node[]>([]);
  let [input, setInput] = useState<string>("");
  let [viewbox, setViewbox] = useState<string>("0 0 400 400");

  const OnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setInput(e.target.value)
  }


  const addNode = () => {
    // setBnt(bnt.insert_test(new Node(input), width).ToArray())

    for(let i=0;i<oneNode.length;i++){
      if(oneNode[i].data === input){
        alert('중복안돼!');
        return;
      }
    }
    setBnt(bnt.insert(new Node(input)).ToArray())
    setOneNode(bnt.getNodeArray())
    setViewbox((prev)=>{
      let result = func(prev,bnt)
      return result;
    })
  }
  useEffect(()=>{
    setBnt(new binaryTree());
  },[])

  useEffect(()=>{
    console.log('변화감지')
  },[oneNode,viewbox])

  return (
    <div>
      <svg
      width="100%"
      min-width="1000px"//App.js의 minWidth가 600이여서 현재 적용안됨
      viewBox={viewbox}
      >
        {
          oneNode.map(oneoneNode=>(
            <Circle data = {oneoneNode.data} x={oneoneNode.x} y={oneoneNode.y} />
          ))
        }
        
        </svg>
        <button onClick={addNode}>
        addNode
        </button>
        <input onChange={OnChange} type="text" name="nodeData"/>

    </div>
  );
}
