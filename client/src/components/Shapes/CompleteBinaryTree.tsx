class BT_Node<T>{
    data: T;
    parent: BT_Node<T>;
    left: BT_Node<T>;
    right: BT_Node<T>;
    position: { x: number, y: number }

    constructor() {
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    
    // Misc
    getDepth(): number {
        let depth = 0;
        let node = this.parent;
        while (!node.isRoot()) {
            node = node.getParent();
            depth++;
        }
        return depth;
    }

    toString(): string {
        return { data: this.data, parent: this.parent, left: this.left, right: this.right }.toString();
    }

    // Children
    hasChild(): boolean {
        return (this.left !== null || this.right !== null);
    }

    getChildren(): BT_Node<T>[] {
        return [this.left, this.right];
    }

    isChild(node: BT_Node<T>): boolean {
        let stack = [];
        stack.push(this);
        while (stack.length > 0) {
            const current = stack.pop();
            if (current === node) {
                return true;
            }
            if(current.left !== null){
                stack.push(current.left);
            }
            if (current.right !== null) {
                stack.push(current.right);
            }
        }
    }

    // Data
    setData(data: T): void {
        this.data = data;
    }

    getData(): T {
        return this.data;
    }

    // Parent
    isRoot(): boolean {
        return this.parent === undefined;
    }

    setParent(node: BT_Node<T>): void {
        this.parent = node;
    }

    getParent(): BT_Node<T> {
        return this.parent;
    }

    // Position
    setPosition(x: number, y: number): void {
        this.position = { x, y };
    }

    getPosition(): { x: number, y: number } {
        return this.position;
    }
}

// 완전이진트리 노드
class CBT<T>{
    private root: BT_Node<T>;
    private size: number;
    private height: number;

    constructor() {
        this.root = new BT_Node<T>();
        this.size = 0;
        this.height = 0;
    }

    // Miscmiscellaneous
    getRoot(): BT_Node<T> {
        return this.root;
    }

    getSize(): number {
        return this.size;
    }

    getHeight(): number {
        return this.height;
    }

    getNodes(): BT_Node<T>[] {
        // TODO: BFS로 구현
        return [];
    }


    // Node
    addNode(data: T): CBT<T> {
        const node = new BT_Node<T>();
        node.setData(data);

        if (this.size === 0) {
            this.root = node;
            this.size++;
            return this;
        }

        let result = []
        let current = this.root;
        let tempSize = this.size

        while(tempSize!==1){
            if(tempSize%2===0){
                tempSize/=2;
                result.push(0);
            }else{
                tempSize--;
                tempSize/=2;
                result.push(1)
            }
        }

        while (result.length > 0) {
            if (result.pop() === 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (current.left === null) {
            current.left = node;
            node.setParent(current);
        }
        else if (current.right === null) {
            current.right = node;
            node.setParent(current);
        }
        this.size++;
        return this;
    }
}

export default CBT;