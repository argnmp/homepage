let data = `
<p><a href="https://ko.wikipedia.org/wiki/%ED%85%8C%EC%8A%A4%ED%8A%B8_%EC%A3%BC%EB%8F%84_%EA%B0%9C%EB%B0%9C">https://ko.wikipedia.org/wiki/%ED%85%8C%EC%8A%A4%ED%8A%B8_%EC%A3%BC%EB%8F%84_%EA%B0%9C%EB%B0%9C</a></p>
<p>TDD는 <strong>Test-Driven Development</strong>의 약자로, 테스트로 주도해가는 개발 방식을 의미한다. 일반적으로는 코드를 먼저 작성하지만, 이 방식에서는 요구사항을 검증할 수 있는 테스트를 먼저 작성하고 최소한의 코드를 작성해서 테스트의 통과 유무에 따라 코드를 리팩토링 해나간다.</p>
<p>단위 테스트(코드)는 이 TDD 과정 중에서도 가장 첫번째 단계인 <strong>기능 단위의 테스트 코드를 작성</strong>하는 것을 의미한다. 이러한 점에서 차이가 있다. </p>
<p><img src="https://kimtahen.com/api/image/1654081924635_9.png" alt></p>
<h1 id="hid게-보호">게 보호</h1>
<h2 id="hid테스트-코드를-작성해야-하는-이유">테스트 코드를 작성해야 하는 이유</h2>
<ol>
<li>빠른 피드백</li>
<li>자동 검증</li>
<li>개발자가 만든 기능을 안전하게 보호</li>
</ol>
<h3 id="hid빠른-피드백">빠른 피드백</h3>
<p>웹 개발을 할 때 코드를 수정하면, 그 코드가 올바르게 작동하는 지를 직접 서버를 켰다가 끄면서 눈과 손으로 확인을 해야 한다. 하지만 테스트 코드가 있다면 그 <strong>직접 확인 하는 과정</strong>을 거칠 필요가 없기 때문에 훨씬 효율적인 개발이 가능하다. 또한 방금 작성한 코드에 대해 빠르게 피드백을 받을 수 있다. (오류가 발생하는지)</p>
<h3 id="hid자동-검증">자동 검증</h3>
<p>서버로 오는 데이터에 대해 확인을 하려면 <code>System.out.println()</code>을 작성하여 cli로 직접 확인해야 한다. 하지만 테스트 코드를 통하여 그렇게 직접 확인하는 과정을 없앨 수가 있다. 직접 검증하는 것이 아닌 테스트 코드를 통한 자동 검증이 가능하다.</p>
<h3 id="hid개발자가-만든-기능을-안전하게-보호">개발자가 만든 기능을 안전하게 보호</h3>
<p>새로운 기능 B를 추가할 때 기존의 기능 A에 대해서 문제가 발생할 수 있다. 이를 해결하기 위해서는 전 과정에 대해 테스트를 진행해야 하고 서비스가 큰 규모 일 수록 엄청난 자원이 소모 된다. 테스트 코드가 있다면, 기존의 기능에 대해서는 이 테스트 코드만 수행하면 되기 때문에 작업이 매우 간단해진다. 따라서 기존의 기능에 대해서 안전하게 보호가 가능하다.</p>
<h2 id="hid테스트-프레임워크">테스트 프레임워크</h2>
<p><strong>xUnit</strong> : 개발환경 (x)에 따라 Unit 테스트를 도와주는 도구</p>
<ul>
<li>JUnit - Java</li>
<li>DBUnit - DB</li>
<li>CppUnit - C++</li>
<li>NUnit - .net</li>
</ul>
<h2 id="hidhello-controller와-테스트-코드-작성">Hello Controller와 테스트 코드 작성</h2>
<p>프로젝트의 코드는 <code>src/main/java</code> 하위 package로 작성하면 되고, 테스트 코드는 <code>src/test/java</code> 하위 package로 작성하면 된다.</p>
<p>나는 여기서 최상단 package를 <code>com.kimtahen.springboot</code> 로 설정하였다.</p>
<h3 id="hid메인-클래스-작성">메인 클래스 작성</h3>
<p><code>com.kimtahen.springboot</code> 하위의 Application Class</p>
<pre><code class="language-java">package com.kimtahen.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
</code></pre>
<ul>
<li>@SpringBootApplication : 스프링 부트의 자동 설정, 스프링 Bean 읽기와 생성을 모두 자동으로 설정한다.</li>
<li>SpringApplication.run() : 내장 WAS를 실행한다.</li>
</ul>
<blockquote>
<p>WAS는 Web Application Server의 약자로 Tomcat 등을 의미한다. 내장 WAS를 사용하는 이유는 <strong>언제 어디서나 같은 환경에서 스프링 부트를 배포할 수 있기 때문이다.</strong></p>
</blockquote>
<h3 id="hid컨트롤러-작성">컨트롤러 작성</h3>
<p><code>com.kimtahen.springboot.web</code> 하위의 HelloController Class</p>
<pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

#define MAX 1001

int n, m, k;
int board[MAX][MAX] = {0,};
int visited[11][MAX][MAX] = {0,};
int min_dist[MAX][MAX] = {0,};

int dx[4] = {0,1,-1,0};
int dy[4] = {1,0,0,-1};

bool isIn(int x, int y){
    return 1<=x && x<=n && 1<=y && y<=m;
}

void bfs(){
    memset(min_dist, -1, sizeof(min_dist));
    //{block,{x,y}}
    queue<pair<int,pair<int,int>>> q; 
    visited[0][1][1] = 1;
    min_dist[1][1] = 0;
    q.push({0,{1,1}});
    while(!q.empty()){
        int x = q.front().second.first;
        int y = q.front().second.second;
        int block = q.front().first;
        q.pop();
        if(x==n && y==m) break;
        for(int i = 0; i<4; i++){
            int nx = dx[i] + x;
            int ny = dy[i] + y;
            if(isIn(nx,ny)){
                if((board[x][y]==1 && visited[block-1][nx][ny]==0 && visited[block][nx][ny]==0) || (board[x][y]==0 && visited[block][nx][ny]==0)){
                    visited[block][nx][ny] = 1;
                    if(board[nx][ny]==0){
                        visited[block][nx][ny] = 1;
                        q.push({block,{nx, ny}});
                    }
                    else if(board[nx][ny]==1 && block < k){
                        visited[block+1][nx][ny] = 1;
                        q.push({block +1, {nx, ny}});
                    }
                    min_dist[nx][ny] = min_dist[x][y] + 1;
                }
            }
        }
    }
}
int main(){
    scanf("%d %d %d",&n,&m,&k);
    // {1,1} ~ {n,m}
    for(int i = 1; i<=n; i++){
        for(int j = 1; j<=m; j++){
            scanf("%1d",&board[i][j]);
        }
    }
    bfs();
    if(min_dist[n][m]==-1) printf("-1");
    else printf("%d",min_dist[n][m]+1);
}
</code></pre>
<ul>
<li>@RestController : JSON을 반환하는 컨트롤러로 만든다.</li>
</ul>
<ol>
<li>@GetMapping(&quot;/hello&quot;) : <code>/hello</code>에 대한 GET요청을 받는 API 생성<ul>
<li><code>/hello</code>로 GET 요청이 오면 &quot;hello&quot;를 반환한다.</li>
</ul>
</li>
<li>@GetMapping(&quot;/hello/dto&quot;) : <code>/hello/dto</code>에 대한 GET 요청을 받는 API 생성<ul>
<li>@RequestParam : GET 요청으로 넘어온 queryString의 key의 value값을 가져온다.</li>
<li>HelloResponseDto 객체를 반환한다. -&gt; JSON으로 응답한다.</li>
</ul>
</li>
</ol>
<h3 id="hiddto-작성">Dto 작성</h3>
<p><code>com.kimtahen.springboot.web.dto</code> 하위의 HelloResponseDto Class</p>
<pre><code class="language-java">package com.kimtahen.springboot.web.dto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HelloResponseDto {
    private final String name;
    private final int amount;
}
</code></pre>
<ul>
<li>@Getter : lombok 플러그인의 기능으로, 클래스의 모든 필드에 대한 get 메서드를 생성한다. 이 클래스로 만들어진 인스턴스에 대해 getName(), getAmount() 메서드가 자동으로 생성된다.</li>
<li>@RequiredArgsConstructor : lombok 플러그인의 기능으로, 클래스의 모든 final 필드를 초기화하는 생성자를 생성한다. 따라서 직접적인 생성자 코드 작성 없이 <code>new HelloResponseDto(name,amount)</code> 로 인스턴스의 name, amount 필드를 초기화 할 수 있다.</li>
</ul>
<h3 id="hid테스트-작성">테스트 작성</h3>
<p>테스트 코드는 <code>/src/test/java</code> 하위에 작성한다. </p>
<h4 id="hidhelloresponsedto-클래스-테스트-코드-작성">HelloResponseDto 클래스 테스트 코드 작성</h4>
<p><code>com.kimtahen.springboot.web.dto</code> 하위의 HelloResponseDtoTest Class</p>
<pre><code class="language-java">package com.kimtahen.springboot.web.dto;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class HelloResponseDtoTest {
    @Test 
    public void lombok_function_test(){
        //given
        String name = &quot;test&quot;;
        int amount = 1000;

        //when
        HelloResponseDto dto = new HelloResponseDto(name, amount);

        //then
        assertThat(dto.getName()).isEqualTo(name);
        assertThat(dto.getAmount()).isEqualTo(amount);
    }
}
</code></pre>
<p>이 코드는 책의 코드와 다르다. 일단 책에서는 jUnit4를 사용하는 반면, 나는 jUnit5를 기본으로 사용한다. 따라서 import 하는 경로가 달라진다. </p>
<p>책에서는 jUnit4 기준으로 아래와 같이 import하지만 </p>
<pre><code class="language-java">import org.junit.Test;
</code></pre>
<p>jUnit5를 사용하는 경우는 아래와 같이 import 해주어야 한다.</p>
<pre><code class="language-java">import org.junit.jupiter.api.Test;
</code></pre>
<ul>
<li>@Test : 해당 메서드를 테스트 대상으로 지정한다. </li>
<li>@assertThat : 테스트 검증 라이브러리의 메서드이다.</li>
<li>@isEqualTo : assertThat 메서드 이후에 체이닝 되어, 파라미터로 받은 값과 일치하면 테스트가 성공이다.</li>
</ul>
<p>Intellij 에서 위의 함수를 실행하면 테스트 성공을 판별할 수 있다. 단축키는 <code>Ctrl + F10</code>이다.</p>
<h4 id="hidhellocontroller-클래스-테스트-코드-작성">HelloController 클래스 테스트 코드 작성</h4>
<p><code>com.kimtahen.springboot.web</code> 하위의 HelloControllerTest Class</p>
<pre><code class="language-java">package com.kimtahen.springboot.web;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = HelloController.class)
public class HelloControllerTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void hello_returns() throws Exception {
        String hello = &quot;hello&quot;;
        mvc.perform(get(&quot;/hello&quot;))
                .andExpect(status().isOk())
                .andExpect(content().string(hello));
    }

    @Test
    public void helloDto_returns() throws Exception {
        String name = &quot;Hello&quot;;
        int amount = 1000;
        mvc.perform(get(&quot;/hello/dto&quot;).param(&quot;name&quot;,name).param(&quot;amount&quot;,String.valueOf(amount)))
                .andExpect(status().isOk())
                .andExpect(jsonPath(&quot;$.name&quot;, is(name)))
                .andExpect(jsonPath(&quot;$.amount&quot;, is(amount)));
    }

}
</code></pre>
<p>책의 코드와 다른 점이 몇 개 있다. </p>
<pre><code class="language-java">import org.junit.Test;
import org.junit.runner.RunWith;
...
import org.springframework.test.context.junit4.SpringRunner;
</code></pre>
<p>이 코드를 jUnit5를 사용하는 경우 다음과 같이 바꾸어 주어야 한다.</p>
<pre><code class="language-java">import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
...
import org.springframework.test.context.junit.jupiter.SpringExtension;
</code></pre>
<ul>
<li>@ExtendWith : 테스트 진행시 jUnit의 내장된 생성자 대신에 SpringExtension의 생성자를 이용한다. </li>
<li>@WebMvcTest : 여러 테스트 어노테이션 중 Web에 대한 어노테이션이다. 위에서 만든 HelloController에 대한 테스트를 진행한다.</li>
<li>@Autowired : 스프링이 관리하는 빈(Bean)을 주입 받는다.</li>
<li><code>private MockMvc mvc</code> : 웹 api 테스트 시 이용하고, 이 클래스를 통해 HTTP method에 대한 테스트를 진행할 수 있다.</li>
<li><code>mvc.perform(get(&quot;/hello&quot;))</code> : MockMvc 를 통해 <code>/hello</code>로 get 요청을 보낸다.</li>
<li><code>mvc.perform(get(&quot;/hello/dto&quot;))</code> : MockMvc 를 통해 <code>/hello/dto</code>로 get 요청을 보낸다. <ul>
<li><code>param()</code> : get 요청의 queryString을 설정해준다. 무조건 String 형으로 설정해주어야 한다.</li>
</ul>
</li>
<li><code>andExpect()</code> : <code>mvc.perform()</code>의 결과를 검증한다. <ul>
<li><code>status().isOk()</code> : HTTP response status가 200인지 검증한다.</li>
<li><code>content().string()</code> : HTTP response body를 검증한다.</li>
<li><code>jsonPath()</code> : json 필드의 값을 검증한다.</li>
</ul>
</li>
</ul>
<p>위의 테스트 코드를 실행하면 통과 된다. </p>
<h2 id="hid서버-실행">서버 실행</h2>
<p><code>com.kimtahen.springboot</code> 하위의 Application Class 에서 <code>Ctrl + F10</code>을 입력하면 내장 WAS가 실행되면서 <code>localhost:8080</code>으로 api요청을 해볼 수 있다.</p>
<p>아래의 두 요청 모두 정상적으로 응답함을 확인할 수 있다.</p>
<h3 id="hidhello">/hello</h3>
<p><img src="/api/image/1653726222159_5.png" alt=""></p>
<h3 id="hidhellodtonamekimamount123fesefsefsef">/hello/dto?name=kim&amp;amount=123fjsesjelfisjelifjselfijiiefsliefhsleifj</h3>
<p><img src="/api/image/1653726257407_6.png" alt=""></p>
<p>queryString을 설정해주어야 한다.</p>
`
let data1 = `
<h1 id="i1">1</h1>
<h2 id="i1-1">1-1</h2>
<h3 id="i1-1-1">1-1-1</h3>
<h2 id="i1-2">1-2</h2>


`
export default data;
