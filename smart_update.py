# -*- coding: utf-8 -*-
"""
自定义的pip install -r requirement.txt
因为pip 的默认操作会报错,会停止,所以自定义一个
直接执行 python smart_update.py 自动安装
"""
import commands
import sys


def query_yes_no(question, default="yes"):
    """
    一个简单的脚本里面交互的函数
    用法:query_yes_no("确定吗?") 如果按yes 则函数返回值为True
    """
    valid = {"yes": True, "y": True, "ye": True,
             "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' "
                             "(or 'y' or 'n').\n")


def install_package_safe():
    """
    """
    pip_exec_path = commands.getoutput('which pip')

    if '/usr/' in pip_exec_path:
        if not query_yes_no('您可能是正在往本地安装而不是往虚拟环境里面安装!建议先加载虚拟环境.您确认一定要安装吗?'):
            print '用户终止安装.'
            return None

    with open('./requirement.txt', 'r') as f:
        start_num = 1
        for line in f.readlines():
            package_name = line.strip()
            if '#' in package_name:
                continue
            command_exec = '%s install %s' % (pip_exec_path, package_name)
            print_format_str(str(start_num) + ":" + package_name)
            output = commands.getstatusoutput(command_exec)
            start_num += 1

            if output[0] != 0:
                print 'ERROR:%s' % command_exec


def print_format_str(custom_str):
    """

    """
    print '-' * 100
    print custom_str
    print '-' * 100


if __name__ == '__main__':
    install_package_safe()
