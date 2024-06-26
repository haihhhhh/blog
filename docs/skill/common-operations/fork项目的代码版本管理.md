---
id: fork-project-code-version-management
title: fork项目的代码版本管理
slug: /common-operations/fork-project-code-version-management
date: 2024-05-13
authors: laohai
tags: [git]
keywords: [git,常用操作]
---
如果你fork了一个项目，想以此为基础打造自己的项目，要如何做好代码版本管理呢？

1. 首先在本地仓库你要创建一个开发的分支，用来完成自己的修改，修改测试无误的功能再推送到master分支

2. 如果你fork的原项目进行了更新，你希望拉取到这些更新。那么你可能需要做这些步骤

   1. 拉取远程仓库的最新更新和自己的dev进行合并，解决冲突，修改测试后提交
   2. 讲稳定运行的dev版本提交到master分支。

   那么我们可以按照如下操作进行

- 首先，验证远程分支是否可以 fetch 或 push：
    
    ```
    git remote -v
    ```
    
- 指明你需要同步的原始仓库：这个步骤是将你的仓库和原始仓库链接起来
    ```
    git remote add upstream [原始仓库地址]
    ```
    
- 再次验证：
    ```
    git remote -v
    ```
    
- 创建一个开发的分支
  
    ~~~git
    git branch dev
    ~~~

- 切换到你的开发分支：

    ```
    git checkout dev
    ```

- 拉取更新的分支和提交：
    
    ```
    git fetch upstream
    ```
    
- 合并原始仓库的更新：
  
    ```
    git merge upstream/dev
    ```
    执行完上一步的合并操作之后，往后还有一些后续处理，比如代码冲突。如果本地修改了内容，
    
    上游仓库也修改了对应的代码，则可能会出现冲突。这时就需要对比代码进行修改。
    
- 提交到你的 dev 仓库：
    ```
    git push origin dev
    ```
检查没有问题后合并到master分支
    
- 首先先切换到master分支

    ```
    git checkout master
    ```

- 再将最新的dev代码合并过来

```
git merge dev
```

- 解决冲突（如果有）：

  如果在合并过程中出现冲突，需要手动解决冲突。编辑冲突文件，然后执行以下命令标记为已解决

  ``` 
  git add .
  git commit -m "解决冲突"
  ```

- 最后，将合并后的修改推送到远程 master 分支

  ```
  git push origin master
  ```

最后说的是，在拉取更新的时候最好有手动保存自己最新修改的劳动成果的习惯，这很重要。