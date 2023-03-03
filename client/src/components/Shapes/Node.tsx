import { Component, ReactNode } from "react";

interface NodeProps<T>{
    data: T;
    parent?: Node<T> | null;
    children?: Node<T>[] | null;
    position?: { 
        x: number, 
        y: number,
    } | null
}

interface NodeState<T>{
    data: T;
    parent: Node<T> | null;
    children: Node<T>[] | null;
    position: { 
        x: number,
        y: number,
    } | null
}

interface BT_NodeProps<T> extends NodeProps<T>{
    left?: Node<T> | null;
    right?: Node<T> | null;
    position: { 
        x: number, 
        y: number,
    }
}

class Node<T> extends Component<NodeProps<T>, NodeState<T>>{
    constructor(props: NodeProps<T>){
        super(props);

        this.state = {
            data: props.data,
            parent: props.parent,
            children: props.children,
            position: props.position,
        }

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.getParent = this.getParent.bind(this);
        this.setParent = this.setParent.bind(this);
        this._getChild = this._getChild.bind(this);
        this._addChild = this._addChild.bind(this);
        this._delChild = this._delChild.bind(this);
    }

    public getData(): T{ return this.state.data }
    setData(data: T): void {
        this.setState(prevState => {
            let state = { ...prevState };
            state.data = data;
            return state;
        })
    }

    public getPosition(): {x:number, y:number} | null { return this.state.position }
    setPosition(position: {x:number, y:number}): void {
        this.setState(prevState => {
            let state = { ...prevState };
            state.position = position;
            return state;
        })
    }

    protected _getChild(idx: number): Node<T> | null {
        if(idx > this.state.children.length){
            console.log("_getChild(" + idx + ") called");
            console.log("index OutOfBounds");
            console.log("length: " + this.state.children.length + " idx: " + idx);
            return null
        }
        return this.state.children[idx]
    }
    protected _addChild(child: Node<T>, idx?: number): void {
        this.setState(prevState => {
            let state = { ...prevState };
            if(typeof idx !== 'undefined') state.children.splice(idx, 0, child);
            else state.children.push(child);
            return state;
        })
    }
    protected _delChild(idx: number): void {
        this.setState(prevState => {
            let state = { ...prevState };
            state.children.splice(idx, 1);
            return state;
        })
    }
    
    public getParent(): Node<T> | null { return this.state.parent }
    setParent(parent: Node<T>): void {
        this.setState(prevState => {
            let state = { ...prevState };
            state.parent = parent;
            return state;
        })
    }

    render(): ReactNode {
        return (
            <>
            </>
        )
    }
}

class BT_Node<T> extends Node<T>{
    constructor(props: BT_NodeProps<T>){
        super(props);

        this.state = {
            data: props.data,
            parent: props.parent,
            children: new Array<Node<T>>(2),
            position: props.position,
        }

        this.getLeft = this.getLeft.bind(this);
        this.getRight = this.getRight.bind(this);
        this.setLeft = this.setLeft.bind(this);
        this.setRight = this.setRight.bind(this);
    }

    public getLeft(): Node<T> | null { return this._getChild(0) }
    public getRight(): Node<T> | null { return this._getChild(1) }
    public setLeft(left: Node<T>): void { this._delChild(0); this._addChild(left, 0); }
    public setRight(right: Node<T>): void { this._delChild(1); this._addChild(right, 1); }
}

export type {Node, BT_Node}