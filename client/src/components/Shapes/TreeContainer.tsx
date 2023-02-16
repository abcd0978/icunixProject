import * as React from 'react';
import Circle from './Circle';
import { useState } from 'react';
import { useEffect } from 'react';
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
  sibling:Node;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class binaryTree{
  head:Node;
  nodeArray:Node[] = []
  constructor(){
    this.head = null;
    console.log('생성됨')
  }

  insert(node:Node){
    if(this.head == null){
      this.head = node;
      this.head.x = 200;
      this.head.y = 20;
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
            node.x = temp.x - 20;
            node.y = temp.y + 30;
            break;
          } else {
            temp = temp.left;
          }
        }else if(ParseNumAndStr(temp.data) < ParseNumAndStr(node.data)){
          if (temp.right == null) {
            node.parent = temp;
            temp.right = node;
            node.x = temp.x + 20;
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

  getNodeArray(){
    return this.nodeArray;
  }
  getLevel(node:Node):number{
    let result = 0;
    let temp:Node = node;
    while(temp){
      temp = temp.parent;
      result++;
    }
    return result-1;
  }
}

export default function TreeContainer (props: ITreeContainerProps) {
  let [bnt,setBnt] = useState<binaryTree>(null);
  let [oneNode,setOneNode] = useState<Node[]>([]);
  let [input, setInput] = useState<string>("");
  
  const OnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setInput(e.target.value)
  }


  const addNode = () => {
    setBnt(bnt.insert(new Node(input)).ToArray())
    setOneNode(bnt.getNodeArray())
  }
  useEffect(()=>{
    setBnt(new binaryTree());
  },[])

  useEffect(()=>{
    console.log('변화감지')
  },[oneNode])

  return (
    <div>
      <svg
      width="70%"
      min-width="1000px"//App.js의 minWidth가 600이여서 현재 적용안됨
      viewBox='0 0 400 400'
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
