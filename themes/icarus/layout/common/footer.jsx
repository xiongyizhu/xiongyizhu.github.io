const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class Footer extends Component {
    render() {
        const {
            logo,
            logoUrl,
            siteUrl,
            siteTitle,
            siteYear,
            author,
            links,
            showVisitorCounter,
            visitorCounterTitle,
            upyunUrl
        } = this.props;

        return <footer class="footer">
            <div class="container">
                <div class="level">
                    <div class="level-start">
                        <a class="footer-logo is-block mb-2" href={siteUrl}>
                            {logo && logo.text ? logo.text : <img src={logoUrl} alt={siteTitle} height="28" />}
                        </a>
                        {/* {showVisitorCounter ? <br /> : null} */}
                        
                        {/* <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank" rel="noopener">    
                         <img src={upyunUrl} alt='又拍云' style="height:45px" />
                        </a> */}
                    </div>
                    <div class="level-middle">
                        <div class="size-small" style="text-align:center;">
                            
                            托管于<a href="https://github.com/xiongyizhu" target="_blank" rel="noopener">GitHub</a>&nbsp;|&nbsp;
                            {/* <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank" rel="noopener">阿里云</a>提供CDN服务&nbsp;|&nbsp; */}
                            <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">鄂ICP备20003465号-1</a>
                            <br/>

                             <span dangerouslySetInnerHTML={{ __html: `&copy; ${siteYear} ${author || siteTitle}` }}></span>

                            &nbsp;&nbsp;Powered by <a href="https://hexo.io/" target="_blank" rel="noopener">Hexo</a>&nbsp;&&nbsp;
                                <a href="https://github.com/ppoffice/hexo-theme-icarus" target="_blank" rel="noopener">Icarus</a>
                        </div>
                        <p class="size-small">
                           
                        </p>
                        <p class="size-small">
                           
                            
                           

                        </p>

                    </div>
                    <div class="level-end">
                    {showVisitorCounter ? <span id="busuanzi_container_site_uv"
                            dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span> : null}
                        {/* {Object.keys(links).length ? <div class="field has-addons">
                            {Object.keys(links).map(name => {
                                const link = links[name];
                                return <p class="control">
                                    <a class={`button is-transparent ${link.icon ? 'is-large' : ''}`} target="_blank" rel="noopener" title={name} href={link.url}>
                                        {link.icon ? <i class={link.icon}></i> : name}
                                    </a>
                                </p>;
                            })}
                        </div> : null} */}
                    </div>
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper } = props;
    const { url_for, _p, date } = helper;
    const { logo, title, author, footer, plugins } = config;

    const links = {};
    if (footer && footer.links) {
        Object.keys(footer.links).forEach(name => {
            const link = footer.links[name];
            links[name] = {
                url: url_for(typeof link === 'string' ? link : link.url),
                icon: link.icon
            };
        });
    }

    return {
        logo,
        logoUrl: url_for(logo),
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        showVisitorCounter: plugins && plugins.busuanzi === true,
        visitorCounterTitle: _p('plugin.visitor', '<span id="busuanzi_value_site_uv">0</span>'),
        upyunUrl: url_for('/img/upyun-logo.png')
    };
});
