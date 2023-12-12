import{_ as s,a as t,b as r,c as d,d as a,e as u}from"./customtool_06-8ec07c7b.js";import{_ as c,r as p,o as m,c as h,a as e,b as i,d as o,f as n}from"./app-ae3c2994.js";const v={},g=n('<h1 id="自定义工具" tabindex="-1"><a class="header-anchor" href="#自定义工具" aria-hidden="true">#</a> 自定义工具</h1><p>腾讯云代码分析平台支持用户自助添加代码分析工具。</p><p>适用场景：自定义规则无法满足团队业务复杂需求，需要更多的代码逻辑来匹配目标代码的情况。通常需要团队业务方自行实现对应代码分析工具。</p><p>只需要几步操作：</p><ol><li>编写代码，实现扫描工具逻辑</li><li>提交工具到 git 代码库</li><li>在页面创建新工具</li><li>为工具添加规则</li><li>将工具配置到执行节点</li><li>在项目分析方案中添加规则</li></ol><div class="custom-container danger"><p class="custom-container-title">扩展集成工具免责声明</p><p>被扩展集成进腾讯云代码分析系统的任何非官方工具，该类工具对于腾讯云代码分析系统等于黑盒，腾讯云代码分析系统不对该类工具负责，由该类工具方承担所有责任（包括但不限于分发被分析代码，产生代码以及相关信息泄漏）。</p></div><h2 id="自定义工具步骤说明" tabindex="-1"><a class="header-anchor" href="#自定义工具步骤说明" aria-hidden="true">#</a> 自定义工具步骤说明</h2><h3 id="第一步-编写代码-实现分析工具逻辑" tabindex="-1"><a class="header-anchor" href="#第一步-编写代码-实现分析工具逻辑" aria-hidden="true">#</a> 第一步，编写代码，实现分析工具逻辑</h3>',8),_={href:"https://github.com/TCATools/demo_tool",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[e("strong",null,"必要：")],-1),q=n("<li><p><strong>运行方式</strong>：支持命令行执行，比如 python run.py 或 run.exe，执行命令的工作目录为工具代码的根目录。</p></li><li><p><strong>运行环境说明</strong>：</p><ul><li>建议将工具打包编译成可执行程序，拉取下来直接可以执行。</li><li>如果工具需要在特定的环境中运行，比如python、java环境，平台提供了丰富的工具依赖包，可以在<code>工具管理</code>-<code>工具依赖</code>中查看，创建工具时可供选择，执行时会自动配置好依赖环境。</li><li>如果现有的工具依赖包未支持所需依赖，也可以创建新的工具依赖使用。</li></ul></li>",2),x=e("p",null,[e("strong",null,"平台已提供的环境变量")],-1),f={href:"https://github.com/TCATools/demo_tool",target:"_blank",rel:"noopener noreferrer"},E=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SOURCE_DIR：要扫描的代码目录路径
DIFF_FILES: 值为一个json文件路径，文件内容为增量扫描的文件列表(增量扫描时可用)
SCAN_FILES: 值为一个json文件路径，文件内容为需要扫描的文件列表(增量或全量扫描均可用)
TASK_REQUEST: 值为一个json文件路径，文件内容为当前扫描任务参数
RESULT_DIR: 结果result.json输出的结果目录路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),j=n(`<li><p><strong>工具命令声明</strong></p><p>在工具仓库根目录下，添加一个<code>tool.json</code>文件，声明工具的检查和扫描命令，比如：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;check_cmd&quot;: &quot;python src/main.py check&quot;,
  &quot;run_cmd&quot;: &quot;python src/main.py scan&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明：</p><ul><li><code>check_cmd</code>： <ul><li>功能：判断当前执行环境是否满足工具要求（如果不需要检查，也可以没有这个命令）。 比如某些工具只能在linux下执行，需要判断当前是否为linux环境。</li><li>输出：将判断结果输出到<code>check_result.json</code>文件中，文件内容为<code>{&quot;usable&quot;: true}</code>或<code>{&quot;usable&quot;: false}</code>。</li></ul></li><li><code>run_cmd</code>： <ul><li>功能：扫描代码，执行自定义检查器逻辑（该命令必须存在）。</li><li>输出：按照指定格式，输出结果到结果目录下的<code>result.json</code>文件中。</li></ul></li></ul></li><li><p><strong>工具输出格式要求</strong></p><ul><li>将扫描结果输出到<code>RESULT_DIR</code>环境变量指定的目录下的<code>result.json</code>文件中（Python 示例代码）</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>import os
import json
result_dir = os.getenv(&quot;RESULT_DIR&quot;, os.getcwd())
result_path = os.path.join(result_dir, &quot;result.json&quot;)
with open(result_path, &quot;w&quot;) as fp:
    json.dump(result, fp, indent=2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>result.json</code> 文件格式如下：</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[
    {
        &quot;path&quot;: &quot;文件绝对路径&quot;,
        &quot;line&quot;: &quot;行号，int类型&quot;,
        &quot;column&quot;: &quot;列号, int类型，如果工具没有输出列号信息，可以用0代替&quot;,
        &quot;msg&quot;: &quot;提示信息&quot;,
        &quot;rule&quot;: &quot;规则名称,可以根据需要输出不同的规则名&quot;,
        &quot;refs&quot;: [
            {
                &quot;line&quot;: &quot;回溯行号&quot;,
                &quot;msg&quot;: &quot;提示信息&quot;,
                &quot;tag&quot;: &quot;用一个词简要标记该行信息，比如uninit_member,member_decl等，如果没有也可以都写成一样的&quot;,
                &quot;path&quot;: &quot;回溯行所在文件绝对路径&quot;
            },
            ...
        ]
    },
    ...
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>refs</code></strong> 字段说明：</p><p>非必需项，可无。该字段记录问题回溯路径信息。比如当前行的代码问题，是经过上下文的三行代码执行路径而导致的，可以将这三行的位置及提示信息，按顺序添加到 refs 数组中。</p></li>`,2),T=n('<h3 id="第二步-提交工具到-git-代码库" tabindex="-1"><a class="header-anchor" href="#第二步-提交工具到-git-代码库" aria-hidden="true">#</a> 第二步，提交工具到 git 代码库</h3><ul><li><p>创建代码库，将工具源代码或编译打包后的可执行文件，提交到代码仓库中（建议提交到master分支，TCA默认拉取的是master分支）。</p></li><li><p>建议代码库中加入 README.md 文件，说明工具功能和维护人。</p></li><li><p>后续需要修改工具实现逻辑，可以直接更新代码库，TCA 平台在执行该工具时，会自动拉取最新工具代码版本。</p></li></ul><h3 id="第三步-在工具管理页面中创建工具" tabindex="-1"><a class="header-anchor" href="#第三步-在工具管理页面中创建工具" aria-hidden="true">#</a> 第三步，在工具管理页面中创建工具</h3><ul><li><p>进入工具管理页面，点击创建工具</p><p><img src="'+s+'" alt="enter image description here"></p></li><li><p>填写工具信息</p><p><img src="'+t+'" alt="enter image description here"></p><p><strong>部分参数说明：</strong></p><ul><li><p><strong>工具仓库地址</strong>，即前述步骤中提交的工具 git 代码库地址，默认拉取的是master分支，如果是其他分支，需要在仓库地址后加上<code>#分支名</code>，比如：<code>https://github.com/xxx/xxx.git#main</code></p></li><li><p><strong>工具认证</strong>，授权拉取工具仓库的权限</p></li><li><p><strong>执行命令</strong>，该命令会在工具根目录下执行</p></li><li><p><strong>环境变量</strong>，工具执行所需的环境变量</p></li><li><p><strong>License</strong>，如果是开源工具，填写工具遵循的开源协议，或者填写自研共建</p></li><li><p><strong>是否为编译型工具</strong>，表示在使用该工具对用户代码进行分析时，是否要求代码需要编译或可执行编译</p></li><li><p><strong>注意</strong>：针对特殊扫描场景的工具（比如检查代码库下是否包含某些第三方依赖目录，结果不涉及单个代码文件的），无法对结果进行代码文件处理，可以通过设置以下环境变量，跳过一些通用的结果处理步骤，避免问题结果被过滤掉：</p><ul><li><code>BLAME_TYPE=NO_BLAME</code>，跳过对代码行/代码文件进行文件责任人定位（结果非单个文件/代码行时使用）</li><li><code>FILTER_TYPE=NO_VERSION_FILTER</code>，跳过检查问题路径（path字段）是否为已提交到代码库中的文件（结果非单个文件/代码行时使用）</li><li><code>IGNORE_TYPE=NO_ISSUE_IGNORE</code>，跳过注释忽略处理（结果非单个文件/代码行时使用）</li></ul></li></ul></li><li><p>添加工具依赖</p><p><img src="'+r+'" alt="enter image description here"></p><p>添加完成后，会展示已添加的依赖方案：</p><p><img src="'+d+'" alt="enter image description here"></p></li></ul><p><strong>工具依赖说明：</strong></p><ul><li>比如当前的demo工具，只需要依赖python3运行，而且支持在linux x86_64、linux arm64、mac和windows下执行，那么只需要配置一个依赖方案（如上图），并配置为默认方案。在不同的操作系统中，会自动加载对应操作系统的python环境。</li><li>如果需要根据扫描项目设置的环境变量，加载不同的依赖配置，则可以配置不同的判断条件，使用多个依赖方案。</li></ul><h3 id="第四步-为工具添加规则" tabindex="-1"><a class="header-anchor" href="#第四步-为工具添加规则" aria-hidden="true">#</a> 第四步，为工具添加规则</h3><ul><li><p>完成工具创建后，进入规则列表，为工具添加规则</p><p><img src="'+a+'" alt="enter image description here"></p></li><li><p>填写规则信息</p><p><strong>部分参数说明：</strong></p><ul><li><p><strong>规则简介</strong>：简要描述规则发现的是什么问题，扫描结果中会作为问题标题展示</p></li><li><p><strong>详细描述</strong>：可详细描述规则，以及规则的解决方式，建议附上解决案例 demo</p></li><li><p><strong>解决方法</strong>：按照实际情况，说明该代码问题的解决方法，建议附上解决案例 demo</p></li><li><p><strong>规则参数</strong>：如果不需要通过规则参数传递信息，可留空</p></li></ul></li></ul><h3 id="第五步-将工具配置到执行节点" tabindex="-1"><a class="header-anchor" href="#第五步-将工具配置到执行节点" aria-hidden="true">#</a> 第五步，将工具配置到执行节点</h3><div class="custom-container tip"><p class="custom-container-title">提示</p><p>需要联系平台管理员协助操作，在<code>管理入口</code>-<code>节点管理</code>中进入需要配置的机器节点的<code>工具进程配置</code>中，找到对应工具，勾选工具进程。</p><p>完成节点配置工具进程后，才能在项目中采用该工具进行分析。</p></div><p><img src="'+u+'" alt="enter image description here"></p><h3 id="第六步-完成上述操作-在项目中使用工具规则" tabindex="-1"><a class="header-anchor" href="#第六步-完成上述操作-在项目中使用工具规则" aria-hidden="true">#</a> 第六步，完成上述操作，在项目中使用工具规则</h3><ul><li><p>进入到项目中，在<code>分析方案</code>-<code>代码检查</code>进行规则配置。</p></li><li><p>点击添加规则，找到对应工具规则进行添加。</p></li><li><p>添加完成后，启动分析，为了将规则应用到所有代码文件，建议启动一次全量分析（增量分析只会分析自上次扫描后变更的文件）。</p></li></ul><h2 id="自定义工具权限说明" tabindex="-1"><a class="header-anchor" href="#自定义工具权限说明" aria-hidden="true">#</a> 自定义工具权限说明</h2><ul><li><p><strong>默认自定义工具仅团队管理员可操作，团队内所有成员可使用。</strong></p><ul><li><p>团队管理员才能创建工具，添加工具规则等，具备该工具全部权限</p></li><li><p>团队内所有成员可使用该工具规则，如在规则配置中添加此工具规则，团队普通成员仅只读权限</p></li></ul></li><li><p><strong>工具希望全平台使用？</strong></p><p>由于全平台使用的工具影响范围较大，建议团队先在团队内对工具进行充分测试，保障团队内工具的高有效性，如需全平台使用，需联系平台管理员进行申请</p><p>平台管理员需对此工具进行审核，在确保工具的高有效性下可将此工具权限调整为全平台可使用</p></li></ul>',15);function I(R,y){const l=p("ExternalLinkIcon");return m(),h("div",null,[g,e("p",null,[i("根据需要匹配的目标代码场景，编写对应的工具逻辑。 可以参考 Python 实现的 "),e("a",_,[i("Demo 项目"),o(l)]),i("。")]),b,e("ul",null,[q,e("li",null,[x,e("ul",null,[e("li",null,[i("获取及使用方式请参考 "),e("a",f,[i("Demo 项目"),o(l)]),i("。")])]),E]),j]),T])}const N=c(v,[["render",I],["__file","自定义工具.html.vue"]]);export{N as default};
