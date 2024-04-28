let run = function (address) {
    let continuing = 1; // 定义一个标志变量，用于控制循环是否继续执行
    while (continuing) { // 进入循环，只要标志变量为真就继续执行
        switch (getStack(address)) { // 根据缓冲区中指定地址的值进行不同的操作
            case "read": // 如果缓冲区中指定地址的值为 "read"
                let r_fd = stack.pop() // 弹出栈顶元素，作为读取文件描述符
                let read_addr = stack.pop() // 弹出栈顶元素，作为读取地址
                if (read_addr.startsWith("{{") && read_addr.endsWith("}}")) { // 如果读取地址是以 "{{" 开头且以 "}}" 结尾
                    read_addr = pie + eval(read_addr.slice(2,-2).replace("stack", (stack.length - 1).toString())) // 解析地址中的表达式，并将结果赋值给读取地址
                }
                read(r_fd, parseInt(read_addr), parseInt(stack.pop())) // 调用读取函数，将读取文件描述符、读取地址和读取字节数作为参数传递
                break;
            case "write": // 如果缓冲区中指定地址的值为 "write"
                let w_fd = stack.pop() // 弹出栈顶元素，作为写入文件描述符
                let write_addr = stack.pop() // 弹出栈顶元素，作为写入地址
                if (write_addr.startsWith("{{") && write_addr.endsWith("}}")) { // 如果写入地址是以 "{{" 开头且以 "}}" 结尾
                    write_addr = pie + eval(write_addr.slice(2,-2).replace("stack", (stack.length - 1).toString())) // 解析地址中的表达式，并将结果赋值给写入地址
                }
                write(w_fd, parseInt(write_addr), parseInt(stack.pop())) // 调用写入函数，将写入文件描述符、写入地址和写入字节数作为参数传递
                break;
            case "exit": // 如果缓冲区中指定地址的值为 "exit"
                continuing = 0; // 设置标志变量为假，结束循环
                break;
            case "call_interface": // 如果缓冲区中指定地址的值为 "call_interface"
                let numOfArgs = stack.pop() // 弹出栈顶元素，作为接口调用的参数数量
                let cmd = stack.pop() // 弹出栈顶元素，作为接口调用的命令
                let args = [] // 定义一个数组，用于存储接口调用的参数
                for (let i = 0; i < numOfArgs; i++) { // 遍历参数数量次
                    args.push(stack.pop()) // 弹出栈顶元素，并将其添加到参数数组中
                }
                cmd += "('"  + args.join("','") + "')" // 构建完整的接口调用命令
                let result = vm.runInNewContext(cmd) // 在新的上下文中执行接口调用命令，并将结果赋值给变量 result
                stack.push(result.toString()) // 将接口调用结果转换为字符串，并将其压入栈中
                break;
            case "push": // 如果缓冲区中指定地址的值为 "push"
                let numOfElem = stack.pop() // 弹出栈顶元素，作为要压入栈的元素数量
                let elemAddr = parseInt(stack.pop()) // 弹出栈顶元素，作为要压入栈的元素起始地址
                for (let i = 0; i < numOfElem; i++) { // 遍历要压入栈的元素数量次
                    stack.push(getStack(elemAddr + i)) // 获取指定地址处的数据，并将其压入栈中
                }
                break;
            default: // 如果缓冲区中指定地址的值不属于上述情况
                stack.push(getStack(address)) // 将缓冲区中指定地址的值压入栈中
                break;
        }
        address += 1 // 将地址值递增，指向下一个缓冲区中的数据
    }
}