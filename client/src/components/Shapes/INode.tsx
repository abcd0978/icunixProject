interface INode<T> {
    data: T;
    parent: INode<T>;

    // Misc
    getDepth(): number;
    toString(): string;

    // Data
    setData(data: T): void;
    getData(): T;

    // Parent
    isRoot(): boolean;
    setParent(node: INode<T>): void;
    getParent(): INode<T>;
}

// 완전이진트리 노드
interface IBT_Node<T> extends INode<T> {
    data: T;
    parent: IBT_Node<T>;
    left: IBT_Node<T>;
    right: IBT_Node<T>;

    // Misc
    getDepth(): number;
    toString(): string;

    // Children
    hasChild(): boolean;
    getChildren(): IBT_Node<T>[];
    isChild(node: IBT_Node<T>): boolean;

    // Data
    setData(data: T): void;
    getData(): T;

    // Parent
    isRoot(): boolean;
    setParent(node: IBT_Node<T>): void;
    getParent(): IBT_Node<T>;

}

export default INode;