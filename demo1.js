//数组的长度是定死的，虽然JS和某些语言的数组长度会变化，但是当我们执行pop，unshift,等操作的时候，时间复杂度为O(n),数据量大的时候，会出现运算时间长的问题。
// 链表可以自动缩放。
//链表每部分保存两个部分，一个是value，一个是下个节点的内存地址。
//从链表中查找一个值，需要从第一个值往后寻找。
//数组里面的数据是按顺序排放的。所以删除或者新增一个数据的话，数据可能要重新排放。
//链表是离散型的。删除或者新增，不会影响数据结构。（重点是离散型的，空间想象一下）
//链表在第一个节点新增，复杂度是O1，但是如果在中间任何位置新增，则复杂度和数组一样是On，因为需要先查找到要新增的位置。

//数组查找任何一个数据的复杂度都是O1，但是往第一个新增的复杂度是On。
//链表查找数据的复杂度是On，但是往第一个新增的复杂度是O1。
//单向链表和双向链表

//创建一个单项链表
//js中。链表本质用对象来实现，对象也是离散性数据
const Node = function (value) {
    this.value = value;
    this.next = null;
}

const toJs = (value) => {
    return JSON.parse(JSON.stringify(value));
}

const LinkList = function () {
    this.length = 1;//如果不初始化这个值，以后想要获取，就只能遍历，效率低
}

//链表的每一项包含两个部分，一个存储值，一个存储下一个节点的指针next
//原型链，包含方法
//addFirst
//addLast
//deleteFirst
//deleteLast
//contains(是否包含)
//indesOf（找出序号）
LinkList.prototype = {
    addLast: function (value) {
        let node = new Node(value);
        if (!this.first) {
            this.first = toJs(node);
            this.last = toJs(node);
        } else {
            let current = this.first;//从第一个节点开始找
            while (current.next) {//循环，最后一个点添加
                current = current.next;//浅拷贝，所以影响到了this.first
            }
            current.next = node;//之前的最后一项的指针指向下一项
            this.last = node;
        }
        this.length += 1;
        return this;
    },
    addFirst: function (value) {
        let node = new Node(value);
        if (!this.first) {
            this.first = toJs(node);
            this.last = toJs(node);
        } else {
            node.next = this.first;
            this.first = node;
        }
        this.length += 1;
        return this;
    },
    indexOf: function (value) {
        let index = 0;
        let current = this.first;
        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++
        }
        return -1
    },
    contains: function (value) {//是否包含  
        // let current = this.first;
        // while (current !== null) {
        //     if (current.value === value) {
        //         return true;
        //     } else {
        //         current = current.next;
        //     }
        // }
        // return false;
        //直接使用封装的index
        return this.indexOf(value) !== -1
    },
    removeFirst: function () {
        if (this.first.next === null) {
            this.first = null;
            this.last = null;
            this.length--;
            return this;
        } else if (this.first) {
            this.first = this.first.next;
            this.length--;
            return this;
        } else {
            throw '找不到第一项'
        }
    },
    removeLast: function () {
        if (this.first.next === null) {
            this.first = null;
            this.last = null;
            this.length--;
            return this;
        } else if (this.first) {
            let current = this.first;
            let currentPre;
            while (current.next) {
                currentPre = current;
                current = current.next;
            }
            currentPre.next = null;
            this.last = currentPre;
            this.length--;
            return this;
        } else {
            throw '找不到第一项'
        }
    },
    toArray: function () {
        let arr = [];
        let current = this.first;
        if (!this.first) {
            throw '链表没有值'
        } else {
            while (current !== null) {
                arr.push(current.value);
                current = current.next;
            }
        }
        return arr;
    },
    reverse: function () {//反转链表
        if (!this.first) {
            return this;
        } else {
            let array = this.toArray();//先转化成数组。如果一个数据类型比较复杂，可以把它先转换成简单的数据类型，在处理
            array.reverse();
            this.last.value = this.first.value;
            this.first = new Node(array[0]);
            for (let i = 1; i < array.length; i++) {
                this.addLast(array[i]);
            }
            this.length = array.length + 1;
            return this;
        }
    }
}

let list = new LinkList();
console.log(list.addLast(10));
console.log(list.addLast(20));
console.log(list.addLast(30));
console.log(list.addLast(40));

//模拟单项链表数据结构
let LinkList_1 = {
    first: {
        value: '1',
        next: {
            value: 'aaa',
            next: {
                value: 'hhh',
                next: {
                    value: 'lll',
                    next: null
                }
            }
        }
    },
    last: {
        value: 'lll',
        next: null
    }
}
