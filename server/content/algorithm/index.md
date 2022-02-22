## 서론
### ❔문제

Leetcode 91번, **Decode Ways** 문제이다. 아래는 leetcode의 링크이다.
[https://leetcode.com/problems/decode-ways/](https://leetcode.com/problems/decode-ways/)

> A-Z 를 포함하는 메시지는  다음과 같이 대응되어 암호화 될 수 있다.
```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```
> 암호화 된 메시지는 위와 같은 매핑의 반대로 다시 복호화 될 수 있다.(여러 방법이 있을 수 있다.) 예를 들어 "11106"의 경우 아래와 같이 복호화 될 수 있다.
```
"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
```
> (11 1 06) 의 경우 06은 6과 다르기 때문에 'F' 로 대응 되지 않기 때문에 타당하지 않은 복호화 방식이다.

> 숫자만 포함하고 있는 문자열 s가 주어지면, decode 하는 방법의 수를 구하시오

test case는 다음과 같다.
```
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
```
```
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```
```
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
```

### 🤔고민
이 문제도 푸는데 시간이 조금 걸렸다. A-Z 문자가 한자리 또는 두자리 수에 매핑이 되고, 매핑이 되지 않는 경우의 수도 존재해서 문제가 복잡해 보였다. 처음에 생각한 방식은 반복문으로 처음부터 돌기 시작하며 경우의 수를 두가지로 나누어, 1.한자리수가 매핑된 경우 2. 두자리 수가 매핑된 경우, 타당한 매핑이면 recursive로 다음 index를 탐색하는 것이었다. 이렇게 코드를 작성해서 제출하니, 시간초과가 나왔다.**"111111111111111111111111111111111111111111111"** 입력이 이렇게 주어질 경우에 위와 같은 방식을 택할 경우 시간초과가 뜰 것이 분명했다. 그래서 입력을 반으로 나누어 풀거나 하는 방법도 생각해보았지만 딱히 그렇게는 풀리지가 않았다.

그러다가 Knapsack 문제를 떠올렸다. 그러니 해결책이 떠올랐다. dp 배열을 하나 만든뒤, 각 index의 값은, 입력에서 그 index까지의 decode 가능한 개수를 넣는다고 생각하고 앞에서 부터 차근차근 해결해나간다. 만약에 index가 3인 경우 dp배열에 들어갈 값은 두가지 경우의 '합'이다. 
* 1. index 3을 기준으로 숫자가 두자리인 경우.

이 경우에는 index 2-3 이 올바른 매핑인지를 확인한 뒤 dp[1] 에 더해준다.

* 2. index 3을 기준으로 숫자가 한자리인 경우.

이 경우에는 index 3이 올바른 매핑인지를 확인한 뒤 dp[2]에 더해준다.

위 두가지 경우를 더한 값이 dp[3]의 값이다. 이런식으로 진행해가면 O(n) 시간에 문제를 해결할 수 있다.

## 코드
내가 작성한 코드는 아래와 같다.
```cpp
class Solution {
public:
    bool decode(string s, int l, int r){
        bool result = false;
        if(r-l==0){
            int t = int(s[l])-48;
            if(t!=0) result = true; 
        }
        else if(r-l==1){
            int t1 = int(s[l])-48;
            int t2 = int(s[r])-48;
            if((t1!=0)&&(t1*10+t2 <= 26)) result = true;
        }
        return result;
    } 
    
    int numDecodings(string s) {
        vector<int> dp(s.size(), 0);    
        if(s.size()==1) return decode(s,0,0);
        dp[0] = decode(s,0,0) ? 1 : 0;
        dp[1] += decode(s,1,1) ? dp[0] : 0;
        dp[1] += decode(s,0,1) ? 1 : 0;
        for(int i = 2; i<s.size(); i++){
            int rel = 0;
            rel += decode(s,i,i) ? dp[i-1] : 0;
            rel += decode(s,i-1,i) ? dp[i-2] : 0;
            dp[i] = rel;
        }
        return dp[s.size()-1];
    }
};
```
함수 decode는 l 부터 r까지의 문자열이 타당한 매핑인지를 확인하여 true or false를 반환한다.

문제를 해결하는 numDecodings 에서는 입력이 1인 경우에 바로 decode를 한 뒤 return을 한다.

입력이 1이 아닌 경우에는 먼저 index 0과 index 1인 경우에 dp값을 쉽게 구할 수 있으므로 구해서 저장해두고, index 2부터 for문을 실행하여 답을 찾아간다. 방식은 위에서 서술한 방법과 같다.

