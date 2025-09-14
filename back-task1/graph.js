class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addEdge(u, v, w) {
        if (!this.adjacencyList[u]) this.adjacencyList[u] = [];
        if (!this.adjacencyList[v]) this.adjacencyList[v] = [];
        
        this.adjacencyList[u].push({ node: v, weight: w });
    }
    
    hasCycle() {
        const graph = this.adjacencyList;
        const inDegree = {};
        const queue = [];
        const topo = [];
        
        for (const node in graph) {
            inDegree[node] = 0;
        }
        
        for (const u in graph) {
            for (const { node: v } of graph[u]) {
                inDegree[v] = (inDegree[v] || 0) + 1;
            }
        }
        
        for (const node in inDegree) {
            if (inDegree[node] === 0) queue.push(node);
        }
        
        while (queue.length > 0) {
            const u = queue.shift();
            topo.push(u);
            
            for (const { node: v } of graph[u]) {
                inDegree[v]--;
                if (inDegree[v] === 0) {
                    queue.push(v);
                }
            }
        }
        
        return topo.length !== Object.keys(graph).length;
    }
    
    shortestPath(u, v) {
        const distances = {};
        const visited = new Set();
        const heap = new MinHeap();
        
        for (let node in this.adjacencyList) {
            distances[node] = Infinity;
        }
        
        distances[u] = 0;
        heap.insert({ node: u, priority: 0 });
        
        while (!heap.isEmpty()) {
            const { node: current, priority: cDist } = heap.extractMin();
            
            if (visited.has(current)) continue;
            visited.add(current);
            
            if (current === v) return cDist;
            
            for (let { node: neighbor, weight } of this.adjacencyList[current]) {
                const newDist = cDist + weight;
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    heap.insert({ node: neighbor, priority: newDist });
                }
            }
        }
        
        return Infinity;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(node) {
        this.heap.push(node);
        this.heapifyUp(this.heap.length - 1);
    }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    heapifyUp(i) {
        let parent = Math.floor((i - 1) / 2);
        while (i > 0 && this.heap[i].priority < this.heap[parent].priority) {
            this.swap(i, parent);
            i = parent;
            parent = Math.floor((i - 1) / 2);
        }
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        this.swap(0, this.heap.length - 1);
        const res = this.heap.pop();
        this.heapifyDown(0);
        return res;
    }
    
    heapifyDown(i = 0) {
        const n = this.heap.length;
        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let tmp = i;
            
            if (left < n && this.heap[left].priority < this.heap[tmp].priority) {
                tmp = left;
            }
            if (right < n && this.heap[right].priority < this.heap[tmp].priority) {
                tmp = right;
            }
            if (tmp !== i) {
                this.swap(i, tmp);
                i = tmp;
            } else {
                break;
            }
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}


export default Graph;
