import * as React from 'react';
import Circle from './Circle';
import Line from './Line';
import { useState } from 'react';
import { useEffect } from 'react';
import { cNull } from '../../util/cNull';
export interface ITreeContainerProps {
}

class Node{
  data: string;
  x:number;
  y:number;
  left:Node;
  right:Node;
  parent:Node;
  level:number;
  gap:number;
  //lines:Line[];

  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.level = null;
    //this.lines = [];
  }
  
  // Set Position
  public setPosition(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  public htmlObject(){
    // let _list:JSX.Elements[]
    // _list.concat(<Circle data={this.data} x={this.x} y={this.y} />);
    // if(cNull(this.left) !== 0) _list.concat(this.left.htmlObject());
    // if(cNull(this.right) !== 0) _list.concat(this.right.htmlObject());
    // console.log(_list);
    // return _list;
    return (
      <>
        {/*Line을 z축의 가장 뒤에 놓기위해서 Line을 먼저 그리기로 했음, 거의 동시에 그려지기 때문에, 그리는 순서에대한 위화감은 안느껴짐*/}
        {cNull(this.left) !== 0 ? <Line x1={this.x} x2 = {this.left.x} y1 = {this.y} y2 = {this.left.y} r={10} /> : (<></>)}
        {cNull(this.right) !== 0 ? <Line x1={this.x} x2 = {this.right.x} y1 = {this.y} y2 = {this.right.y} r={10} /> : (<></>)}

        <Circle data={this.data} x={this.x} y={this.y} />
        
        {cNull(this.left) !== 0 ? this.left.htmlObject() : (<></>)}
        {cNull(this.right) !== 0 ? this.right.htmlObject() : (<></>)}

      </>
    )
  }
  
}

// interface Line{
//   x1:number;
//   y1:number;
//   x2:number;
//   y2:number;
//   r?:number;
// }

class binaryTree{
  head:Node;//root node
  nodeArray:Node[] = [];
  // lineArray:Line[] = [];
  treeLevel:number;
  nodeMap:Map<number,number>;
  newLevelFlag:boolean;

  constructor(){
    this.head = null;
    this.treeLevel = 0;
    this.nodeMap = new Map();
    console.log('생성됨')
  }

  /**
   * @todo: if both node.data and temp.data is number, especially a negative number,
   *          compare it as number
   */
  insert(node:Node){
    this.newLevelFlag = false;
    if(this.head == null){
      this.head = node;
      this.head.x = 200; // TODO: get width of ViewBox
      this.head.y = 20;
      this.head.gap = this.head.x / 2;
      this.head.level = 0;
    } else {
      let gap:number = 0;
      let temp:Node = this.head;
      while (temp) {
        if ( temp.data == node.data ){
          console.log("중복된 노드값을 넣을 수 없음");
          return;
        }

        if(temp.data > node.data){
          if (temp.left == null) {
            temp.left = node;
            gap = -1;
            break;
          } else {
            temp = temp.left;
          }
        } else if(temp.data < node.data){
          if (temp.right == null) {
            temp.right = node;
            gap = 1;
            break;
          } else {
            temp = temp.right;
          }
        }
      }
      
      node.parent = temp;

      node.level = node.parent.level + 1;
      node.x = node.parent.x + (gap * node.parent.gap);
      node.gap = node.parent.gap / 2;
      node.y = node.parent.y + 30;
      // check if resetting position of whole tree is needed
      if ( this.treeLevel < node.level ){
        //console.log("this.treeLevel("+this.treeLevel+") < node.level("+node.level+") ");
        this.newLevelFlag = true;
        this.treeLevel = node.level;
      }
    }
    return this;
  }
  
  remove(node:Node){
    
  }

  /**
   * htmlObject
   */
  public htmlObject() {
    return [
       ( cNull(this.head) !== 0 ) ? this.head.htmlObject() : null
    ]
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
/*
  setLines():void{
    let _line:Line;
    let temp:Node = this.head;
    while(temp){
      if(cNull(temp.left) !== 0){
        // draw line from temp to temp.left
        _line.x1 = temp.x;
        _line.y1 = temp.y; // temp.y + r;

        _line.x2 = temp.left.x;
        _line.y2 = temp.left.y;
        //temp.lines.push(_line);
      }
      if(cNull(temp.right) !== 0){
        // draw line from temp to temp.right
        _line.x1 = temp.x;
        _line.y1 = temp.y;
        
        _line.x2 = temp.right.x;
        _line.y2 = temp.right.y;
        //temp.lines.push(_line);
      }
    }
  }
*/
  getNodeArray(){
    return this.nodeArray;
  }

  getTreeLevel():number{
    return this.treeLevel;
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
    // this.setInterval(this.head, 10);
    this.head.gap = this.head.x / 2;
    this.recalculate_position(this.head);
  }

  /**
   * @brief X축으로 interval 만큼 주어진 node를 이동
   * 
   * @param {Node}node 부모노드 
   * @param {number}interval X축으로 이동할 거리
   */
  parallelMove( node:Node, interval:number ): void {
    if ( cNull(node) === 0 ) return;

    if ( cNull(node.left) !== 0 ) {
      node.left.x = node.left.x + interval;
      this.parallelMove( node.left, interval );
    }

    if ( cNull(node.right) !== 0 ) {
      node.right.x = node.right.x + interval;
      this.parallelMove( node.right, interval );
    }

  }
  
  
  /**
   * @brief X축으로 left와 right자식 노드에대해 해당 노드의 gap을 더 함(left 자식노드는 - 이동, right 자식노드는 + 이동)
   * 
   * @param {Node} node 부모노드 
   * @param {string=} lastmove 마지막으로 이동한 방향 (미사용)
   */
  recalculate_position( node:Node ) : void {
    console.log( "recalculate_position(" + node.data + ") called" );
    console.log("node("+ node.data+").gap : " + node.gap);
    if( cNull(node) === 0 ) return;
    console.log( node.data+"의 바뀐후 위치:("+node.x+","+node.y+")" );

    if( cNull(node.left)!==0 ){ 
      console.log( node.left.data+"의 바뀌기전 x좌표:("+node.left.x+`)` );
      node.left.x = node.x - node.gap;
      node.left.gap = node.gap / 2;
      this.recalculate_position( node.left );
    }

    if( cNull(node.right)!==0 ){
      console.log( node.right.data+"의 바뀌기전 x좌표:("+node.right.x+`)` );
      node.right.x = node.x + node.gap;
      node.right.gap = node.gap / 2;
      this.recalculate_position( node.right );
    }
  }
  
  
  /**
   * @brief X축으로 left와 right자식 노드에대해 간격을 더 함(left 자식노드는 - 이동, right 자식노드는 + 이동)
   * 
   * setInterval(node, width){
   *    if (left !== null ) { // set left.x -}
   *    left <-[width/2] - node -[width/2]-> right
   *    setInterval(node.left, width +- x)
   *    setInterval(node.right, width +- x)
   * }
   * 
   * @param {Node} node 부모노드 
   * @param {number} interval X축으로 이동할 거리
   * @param {string=} lastmove 마지막으로 이동한 방향 (미사용)
   */
  setInterval( node:Node, interval:number ) : void {
    if ( cNull(node) === 0 ) return;

    if ( cNull(node.left) !== 0 ) {
      node.left.x = node.left.x - interval;
      this.setInterval( node.left, interval );
    }

    if ( cNull(node.right) !== 0 ) {
      node.right.x = node.right.x + interval;
      this.setInterval( node.right, interval );
    }
  }
}

function func(prev:string, bnt:binaryTree):string{
  
  let treeLevel = bnt.getTreeLevel()-4;//level5부터 늘릴것이기때문에 -4함.
  let size = 400 + (Math.pow(2, treeLevel)*100); // 400: base size
  if(treeLevel > 0 && bnt.getNewLevelFlag()){
    let resultString = `0 0 ${size} 400`;
    bnt.setHeadXpos(size/2); // root노드를 확대된 viewBox의 중앙으로 옮긴다.
    return resultString;
  }else{
    return prev;
  }

}

export default function TreeContainer (props: ITreeContainerProps) {
  // const width = 600;
  let [input, setInput] = useState<string>("");
  let [bnt,setBnt] = useState<binaryTree>(null);
  let [oneNode, setOneNode] = useState<Node[]>([]);
  let [viewbox, setViewbox] = useState<string>("0 0 400 400");

  const OnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    console.log("input: "+ input + ", e.target.value " + e.target.value);
    setInput(e.target.value)
  }

  const addNode = () => {
    // setBnt(bnt.insert_test(new Node(input), width).ToArray())
    for(let i=0;i<oneNode.length;i++){
      if(oneNode[i].data == input){
        alert('중복안돼!');
        return;
      }
    }
    setBnt(bnt.insert(new Node(input)).ToArray());
    setOneNode(bnt.getNodeArray());
    setViewbox((prev)=>{
      let result = func(prev,bnt)
      return result;
    });
    setInput(() => {
      return "";
    });
  }

  const addNodeDebug=()=>{

    setBnt(bnt.insert(new Node(5)).ToArray());
    setBnt(bnt.insert(new Node(4)).ToArray());
    setBnt(bnt.insert(new Node(6)).ToArray());
    setBnt(bnt.insert(new Node(3)).ToArray());
    setBnt(bnt.insert(new Node(3.5)).ToArray());
    setBnt(bnt.insert(new Node(4.5)).ToArray());
    setBnt(bnt.insert(new Node(4.25)).ToArray());
    setBnt(bnt.insert(new Node(4.75)).ToArray());
    setBnt(bnt.insert(new Node(7)).ToArray());
    setBnt(bnt.insert(new Node(5.5)).ToArray());
    setBnt(bnt.insert(new Node(5.25)).ToArray());
    setBnt(bnt.insert(new Node(5.75)).ToArray());
    setBnt(bnt.insert(new Node(6.5)).ToArray());
    setBnt(bnt.insert(new Node(8)).ToArray());
    setBnt(bnt.insert(new Node(2)).ToArray());

    setOneNode(bnt.getNodeArray());
    
  }

  useEffect(()=>{
    console.log('useEffect 불림')
    setBnt(new binaryTree());
  }, [])

  useEffect(()=>{
    console.log('변화감지')
  }, [oneNode, viewbox] )

  return (
    <div>
      <svg
      width="100%"
      min-width="1000px"//App.js의 minWidth가 600이여서 현재 적용안됨
      viewBox={viewbox}
      >
        {
          (cNull(bnt) === 0) ? null : bnt.htmlObject()
          // oneNode.map( node=>(
          //   node.htmlObject()
          // ))
        }
      </svg>
      <button onClick={addNode}>
      addNode
      </button>
      <input onChange={OnChange} type="text" name="nodeData"/>

      <button onClick={addNodeDebug}>
      addNodeDebug
      </button>

    </div>
  );
}