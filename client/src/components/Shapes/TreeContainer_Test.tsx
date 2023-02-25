import * as React from 'react';

// interface _Props {
// }

// interface _State {
// }

// class BT_Node<T> extends React.Component {
//   // data: T;
//   // parent: BT_Node<T>;
//   // left: BT_Node<T>;
//   // right: BT_Node<T>;
//   // position: { x: number, y: number }

//   constructor() {
//       this.parent = null;
//       this.left = null;
//       this.right = null;
//   }
  
//   // Misc
//   getDepth(): number {
//       let depth = 0;
//       let node = this.parent;
//       while (!node.isRoot()) {
//           node = node.getParent();
//           depth++;
//       }
//       return depth;
//   }

//   toString(): string {
//       return { data: this.data, parent: this.parent, left: this.left, right: this.right }.toString();
//   }

//   // Children
//   hasChild(): boolean {
//       return (this.left !== null || this.right !== null);
//   }

//   getChildren(): BT_Node<T>[] {
//       return [this.left, this.right];
//   }

//   isChild(node: BT_Node<T>): boolean {
//       let stack = [];
//       stack.push(this);
//       while (stack.length > 0) {
//           const current = stack.pop();
//           if (current === node) {
//               return true;
//           }
//           if(current.left !== null){
//               stack.push(current.left);
//           }
//           if (current.right !== null) {
//               stack.push(current.right);
//           }
//       }
//   }

//   // Data
//   setData(data: T): void {
//       this.data = data;
//   }

//   getData(): T {
//       return this.data;
//   }

//   // Parent
//   isRoot(): boolean {
//       return this.parent === undefined;
//   }

//   setParent(node: BT_Node<T>): void {
//       this.parent = node;
//   }

//   getParent(): BT_Node<T> {
//       return this.parent;
//   }

//   // Position
//   setPosition(x: number, y: number): void {
//       this.position = { x, y };
//   }

//   getPosition(): { x: number, y: number } {
//       return this.position;
//   }
// }

// class TreeContainer_Test extends React.Component<_Props, _State> {

//   constructor(props: _Props){
//     super(props);

//     // state 정의
//     this.state = {
//     };
//   }

//   render(): React.ReactNode {
//     return (
//       <div>
//         <svg>

//         </svg>
//       </div>
//     )
//   }
// }
