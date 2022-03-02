### ❔문제
Leetcode 22번, **Generate Parentheses** 문제이다. 아래는 leetcode의 링크이다. 
[https://leetcode.com/problems/generate-parentheses/](https://leetcode.com/problems/generate-parentheses/)

> n 쌍의 괄호가 주어졌을때 **잘 만들어진** 모든 괄호들의 조합을 생성하는 함수를 작성하시오.

테스트 케이스는 다음과 같다.
```bash
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```
```bash
Input: n = 1
Output: ["()"]
```

n의 범위는 아래와 같다.
> 1 <= n <= 8

### 🤔고민
이 문제를 푸는데 시간이 꽤 걸렸다. 처음에 생각했던 방식은 괄호 쌍을 생성해 놓고 그 쌍을 중심으로 왼쪽이나 오른쪽 아니면 가운데에 괄호를 넣는 방식으로 순차적으로 찾아가는 것이었다. 하지만 고민에 고민을 거듭해도 깔끔한 방식이 떠오르지 않았다. 순차적으로 해결하기가 매우 어려웠다. 무엇보다도 이런 방식을 택할 경우에 중복되는 조합을 걸러내기가 매우 어려웠고, 이를 찾아내기 위하여 또 탐색을 하는 것은 매우매우 오랜 시간이 걸린다.

그리하여 이 방법은 포기하고 recursive 한 방식을 고민하였다. 괄호의 조합을 앞에서부터 순차적으로 출력하는 것에 초점을 두었다. recursive 함수에서 출력하기 위해서 택할 방법은 둘 중에 하나이다. **(** 를 출력하던지, 혹은 **)** 를 출력하는 것이다. 둘 중에 하나를 골라서 출력한다고 생각하면, 서로 독립적이기 때문에 중복되는 문제도 해결이 된다.

## 코드
내가 작성한 코드는 아래와 같다.
```cpp
class Solution {
public:
    void make(vector<string>& result, int front, int back, int current, string p){
        if(front==0 && back==0){
            result.push_back(p);
            return;
        }
        if(front){
            make(result, front-1, back, current + 1, p + '(');
        }
        if(back && (current-1>=0)){
            make(result, front, back - 1, current - 1, p + ')');
        }
        return;
    }
    vector<string> generateParenthesis(int n) {
        vector<string> result;       
        string p;
        make(result, n, n, 0, p);
        return result;
    }
};
```
n은 괄호 쌍의 수이다. make라는 함수에서는 result, front, back, current, p 라는 parameter을 가지고 있다. front는 **(** 의 개수이고, back은 **)** 의 개수이다. current 는 back괄호가 front보다 많아지는 걸 방지하기 위한 변수이다. front 괄호를 선택할 경우 current 변수는 1이 늘어나고, back 괄호를 선택할 경우 current 변수는 1이 줄어든다. current가 0보다 작으면 이는 적절하지 않은 조합이 되기 때문에 current를 활용하여 어떤 괄호를 선택할지 결정한다. front == 2, back == 2 인 상태에서 current는 0이다. 이상태에서 back을 고르면 current 는 -1이 되어 적절하지 못한 조합이되므로 제외한다. result는 전체 결과를 저장하고, p는 현재 만들고 있는 괄호 조합이다.

둘 중에 하나를 선택해서 recursive 호출을 한다. 그리고 기저 사례는 모든 괄호를 조합에 추가한, front == 0 && back == 0 인 상태이므로, 이때 result에 생성이 완료된 p를 추가한다.
