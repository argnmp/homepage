let data = `
    <h2 id="서론">서론</h2>
<h3 id="❔문제">❔문제</h3>
<p>Leetcode 91번, <strong>Decode Ways</strong> 문제이다. 아래는 leetcode의 링크이다.
<a href="https://leetcode.com/problems/decode-ways/">https://leetcode.com/problems/decode-ways/</a></p>
<blockquote>
<p>A-Z 를 포함하는 메시지는  다음과 같이 대응되어 암호화 될 수 있다.</p>
</blockquote>
<pre><code>&#39;A&#39; -&gt; &quot;1&quot;
&#39;B&#39; -&gt; &quot;2&quot;
...
&#39;Z&#39; -&gt; &quot;26&quot;
</code></pre>
<blockquote>
<p>암호화 된 메시지는 위와 같은 매핑의 반대로 다시 복호화 될 수 있다.(여러 방법이 있을 수 있다.) 예를 들어 &quot;11106&quot;의 경우 아래와 같이 복호화 될 수 있다.</p>
</blockquote>
<pre><code>&quot;AAJF&quot; with the grouping (1 1 10 6)
&quot;KJF&quot; with the grouping (11 10 6)
</code></pre>
<blockquote>
<p>(11 1 06) 의 경우 06은 6과 다르기 때문에 &#39;F&#39; 로 대응 되지 않기 때문에 타당하지 않은 복호화 방식이다.</p>
</blockquote>
<blockquote>
<p>숫자만 포함하고 있는 문자열 s가 주어지면, decode 하는 방법의 수를 구하시오</p>
</blockquote>
<p>test case는 다음과 같다.</p>
<pre><code>Input: s = &quot;12&quot;
Output: 2
Explanation: &quot;12&quot; could be decoded as &quot;AB&quot; (1 2) or &quot;L&quot; (12).
</code></pre>
<pre><code>Input: s = &quot;226&quot;
Output: 3
Explanation: &quot;226&quot; could be decoded as &quot;BZ&quot; (2 26), &quot;VF&quot; (22 6), or &quot;BBF&quot; (2 2 6).
</code></pre>
<pre><code>Input: s = &quot;06&quot;
Output: 0
Explanation: &quot;06&quot; cannot be mapped to &quot;F&quot; because of the leading zero (&quot;6&quot; is different from &quot;06&quot;).
</code></pre>
<h3 id="🤔고민">🤔고민</h3>
<p>이 문제도 푸는데 시간이 조금 걸렸다. A-Z 문자가 한자리 또는 두자리 수에 매핑이 되고, 매핑이 되지 않는 경우의 수도 존재해서 문제가 복잡해 보였다. 처음에 생각한 방식은 반복문으로 처음부터 돌기 시작하며 경우의 수를 두가지로 나누어, 1.한자리수가 매핑된 경우 2. 두자리 수가 매핑된 경우, 타당한 매핑이면 recursive로 다음 index를 탐색하는 것이었다. 이렇게 코드를 작성해서 제출하니, 시간초과가 나왔다.<strong>&quot;111111111111111111111111111111111111111111111&quot;</strong> 입력이 이렇게 주어질 경우에 위와 같은 방식을 택할 경우 시간초과가 뜰 것이 분명했다. 그래서 입력을 반으로 나누어 풀거나 하는 방법도 생각해보았지만 딱히 그렇게는 풀리지가 않았다.</p>
<p>그러다가 Knapsack 문제를 떠올렸다. 그러니 해결책이 떠올랐다. dp 배열을 하나 만든뒤, 각 index의 값은, 입력에서 그 index까지의 decode 가능한 개수를 넣는다고 생각하고 앞에서 부터 차근차근 해결해나간다. 만약에 index가 3인 경우 dp배열에 들어갈 값은 두가지 경우의 &#39;합&#39;이다. </p>
<ul>
<li><ol>
<li>index 3을 기준으로 숫자가 두자리인 경우.</li>
</ol>
</li>
</ul>
<p>이 경우에는 index 2-3 이 올바른 매핑인지를 확인한 뒤 dp[1] 에 더해준다.</p>
<ul>
<li><ol start="2">
<li>index 3을 기준으로 숫자가 한자리인 경우.</li>
</ol>
</li>
</ul>
<p>이 경우에는 index 3이 올바른 매핑인지를 확인한 뒤 dp[2]에 더해준다.</p>
<p>위 두가지 경우를 더한 값이 dp[3]의 값이다. 이런식으로 진행해가면 O(n) 시간에 문제를 해결할 수 있다.</p>
<h2 id="코드">코드</h2>
<p>내가 작성한 코드는 아래와 같다.</p>
<pre><code class="language-cpp">class Solution {
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
            if((t1!=0)&amp;&amp;(t1*10+t2 &lt;= 26)) result = true;
        }
        return result;
    } 
    
    int numDecodings(string s) {
        vector&lt;int&gt; dp(s.size(), 0);    
        if(s.size()==1) return decode(s,0,0);
        dp[0] = decode(s,0,0) ? 1 : 0;
        dp[1] += decode(s,1,1) ? dp[0] : 0;
        dp[1] += decode(s,0,1) ? 1 : 0;
        for(int i = 2; i&lt;s.size(); i++){
            int rel = 0;
            rel += decode(s,i,i) ? dp[i-1] : 0;
            rel += decode(s,i-1,i) ? dp[i-2] : 0;
            dp[i] = rel;
        }
        return dp[s.size()-1];
    }
};
</code></pre>
<p>함수 decode는 l 부터 r까지의 문자열이 타당한 매핑인지를 확인하여 true or false를 반환한다.</p>
<p>문제를 해결하는 numDecodings 에서는 입력이 1인 경우에 바로 decode를 한 뒤 return을 한다.</p>
<p>입력이 1이 아닌 경우에는 먼저 index 0과 index 1인 경우에 dp값을 쉽게 구할 수 있으므로 구해서 저장해두고, index 2부터 for문을 실행하여 답을 찾아간다. 방식은 위에서 서술한 방법과 같다.</p>


`
let data1 = `
<h1 id="i1">1</h1>
<h2 id="i1-1">1-1</h2>
<h3 id="i1-1-1">1-1-1</h3>
<h2 id="i1-2">1-2</h2>


`
export default data;
