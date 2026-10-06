/* ===================================================
   app.js — Hairul Ameer Portfolio
   =================================================== */

'use strict';

/* -------- BLOG DATA -------- */
const BLOGS = [
  {
    num: '01',
    category: 'AI Learning',
    title: "What Is AI Based Cyber Learning? A Beginner's Guide",
    excerpt: "AI-based cyber learning combines guided instruction, practical labs and intelligent tools to make cybersecurity practice more interactive.",
    author: 'Hairul Ameer',
    readTime: '8 min',
    tags: ['AI Learning', 'Cybersecurity', 'AI', 'Cybersecurity Training'],
    content: `Cybersecurity is a practical field. Reading about vulnerabilities is useful, but understanding them usually requires practice. AI-based cyber learning combines traditional cybersecurity education with artificial intelligence to make that practice more interactive and accessible.

Instead of treating AI as a replacement for an instructor, learners can use it as a support layer. An AI assistant can explain a networking concept, break a large topic into smaller tasks, generate practice questions, or provide hints when a learner is stuck. The learner still performs the reasoning and practical work.

In a cybersecurity lab, AI can help learners understand complex scenarios. A student might begin with a vulnerable web application, inspect its behaviour, identify an input that deserves testing, and ask an AI system to explain an unfamiliar error. This creates a learning loop: observe, investigate, test, understand and repeat.

AI-based learning is especially useful when combined with hands-on environments. A browser-based lab, Linux terminal, security tools and vulnerable applications provide the practical environment, while AI can act as an additional explanation and guidance layer.

There are limits. AI systems can produce incorrect or incomplete explanations. Security learners should verify commands, understand why a technique works, and use only authorised environments.

For beginners, a good learning path is to start with networking, operating systems, Linux, web technologies and basic security concepts. After that, areas such as vulnerability assessment, web security, incident response and threat intelligence become easier to understand.

AI-based cyber learning is therefore less about letting a machine do the learning and more about making learning responsive. Combined with structured courses, practical labs and responsible experimentation, AI can help learners practise more often, ask better questions and build confidence.`
  },
  {
    num: '02',
    category: 'Cyber Careers',
    title: 'How to Choose a Career in Cyber Security',
    excerpt: "Cybersecurity has many career paths, so choosing one starts with understanding your interests, skills and preferred type of security work.",
    author: 'Hairul Ameer',
    readTime: '7 min',
    tags: ['Cyber Careers', 'Cybersecurity Jobs', 'Career', 'Ethical Hacking'],
    content: `Cybersecurity is not one job. It is a broad field containing technical, analytical, defensive, offensive, governance and response-oriented roles. For a student beginning the journey, that variety can be confusing. The best starting point is to understand what different areas involve and then test those areas through practical learning.

If you enjoy understanding how systems work, security testing and penetration testing may be interesting. If you prefer monitoring events and investigating alerts, a SOC or defensive-security path may fit your interests. Incident response focuses on security events, while digital forensics focuses on collecting and analysing evidence.

Your foundation matters regardless of the path. Networking helps explain how systems communicate. Linux introduces command-line workflows and operating-system concepts. Web fundamentals make application security easier to understand. Basic programming helps when automation or source-code analysis becomes part of the work.

Practical exposure is one of the most useful ways to choose. Try small projects or controlled labs. Perform a basic web-security exercise, analyse a log, inspect a sample application, or build a small security automation script. Notice which activities make you curious enough to keep investigating.

Certifications can support a learning plan, but they should not replace hands-on ability. A portfolio can demonstrate practical work: lab write-ups, scripts, small tools, research notes or documented projects.

Cybersecurity careers also require communication. Security professionals often explain technical issues to developers, managers, clients or other teams. Clear reporting and careful documentation are valuable alongside technical skills.

A career decision does not have to be permanent. Start with fundamentals, explore several practical domains, identify the type of problems you enjoy solving, and build deeper skills in that direction.`
  },
  {
    num: '03',
    category: 'Cyber Careers',
    title: 'Cyber Security Job Opportunities: Where the Roles Are',
    excerpt: "Cybersecurity roles exist across testing, defence, monitoring, incident response, application security, cloud and security engineering.",
    author: 'Hairul Ameer',
    readTime: '6 min',
    tags: ['Cybersecurity Jobs', 'Cyber Careers', 'SOC', 'VAPT', 'Security Engineering'],
    content: `Cybersecurity work appears in many forms. Companies need people who can test applications, monitor environments, investigate incidents, secure cloud systems, assess risk and build security controls. This creates multiple entry points for students and professionals.

Penetration testers and VAPT professionals assess systems for weaknesses within an authorised scope. Application-security roles help development teams identify and reduce weaknesses in software throughout its lifecycle.

SOC analysts monitor security events and investigate suspicious activity. They may review alerts, examine logs, identify indicators and escalate incidents. Incident-response teams become involved when an organisation needs to understand, contain and recover from a security event.

Security engineering is another broad area. Security engineers may build controls, automate repetitive tasks, integrate security technologies or improve infrastructure security.

Cloud-security roles focus on identity, permissions, configurations, workloads and monitoring in cloud environments.

Other paths include digital forensics, threat intelligence, malware analysis, governance and risk, security auditing and security awareness. Each path requires a different combination of technical knowledge, analysis and communication.

For students, the practical starting point is often the same: networking, Linux, web technologies, operating systems and security fundamentals. Projects and labs can help reveal which role is most interesting. A portfolio can document the skills being developed.

Job titles vary between companies, so reading actual responsibilities is important. Build fundamentals, practise safely, document your work and keep learning.`
  }
];

/* -------- TAB SWITCHING -------- */
let currentTab = 'about';

function switchTab(id) {
  if (currentTab === id) return;

  // Deactivate current
  document.getElementById('tab-' + currentTab)?.classList.remove('active');
  document.getElementById('tab-' + currentTab)?.setAttribute('aria-selected', 'false');
  document.getElementById('tab-' + currentTab)?.setAttribute('tabindex', '-1');
  const prevPanel = document.getElementById(currentTab);
  if (prevPanel) { prevPanel.classList.add('hidden'); prevPanel.classList.remove('active'); }

  // Activate new
  currentTab = id;
  const tab = document.getElementById('tab-' + id);
  tab?.classList.add('active');
  tab?.setAttribute('aria-selected', 'true');
  tab?.setAttribute('tabindex', '0');

  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.remove('hidden');
    panel.classList.add('active');
    // Re-trigger animation
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = '';
  }

  // Re-trigger stagger
  const stagger = panel?.querySelector('.stagger');
  if (stagger) {
    stagger.querySelectorAll('*').forEach((el, i) => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
  }

  // Init blogs if switching to blogs
  if (id === 'blogs') { renderBlogPreview(0); }
}

/* -------- KEYBOARD NAV FOR TABS -------- */
const TAB_IDS = ['about', 'work', 'projects', 'blogs', 'skills', 'contact'];
document.querySelector('.tabs-row')?.addEventListener('keydown', function(e) {
  const current = TAB_IDS.indexOf(currentTab);
  if (e.key === 'ArrowRight') {
    const next = (current + 1) % TAB_IDS.length;
    switchTab(TAB_IDS[next]);
    document.getElementById('tab-' + TAB_IDS[next])?.focus();
  } else if (e.key === 'ArrowLeft') {
    const prev = (current - 1 + TAB_IDS.length) % TAB_IDS.length;
    switchTab(TAB_IDS[prev]);
    document.getElementById('tab-' + TAB_IDS[prev])?.focus();
  }
});

/* -------- BLOG SELECTION -------- */
let currentBlog = 0;

function selectBlog(idx) {
  if (currentBlog === idx) return;

  // Remove active from all items
  document.querySelectorAll('.blog-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.blog-num').forEach(el => el.classList.remove('accent'));

  // Set active
  const item = document.getElementById('blog-item-' + idx);
  if (item) {
    item.classList.add('active');
    item.querySelector('.blog-num')?.classList.add('accent');
  }

  currentBlog = idx;
  renderBlogPreview(idx);
}

function renderBlogPreview(idx) {
  const blog = BLOGS[idx];
  if (!blog) return;
  const el = document.getElementById('blog-preview');
  if (!el) return;

  el.innerHTML = `
    <p class="mono-label preview-category">${escHtml(blog.category)}</p>
    <h2 class="preview-title">${escHtml(blog.title)}</h2>
    <p class="preview-excerpt">${escHtml(blog.excerpt)}</p>
    <div class="preview-tags">
      ${blog.tags.map(t => `<span class="preview-tag">${escHtml(t)}</span>`).join('')}
    </div>
    <p class="mono-label preview-author">${escHtml(blog.author)} &middot; ${escHtml(blog.readTime)} read</p>
  `;

  // Re-animate
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'wipeIn 0.3s ease both';
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* -------- INIT -------- */
document.addEventListener('DOMContentLoaded', function() {
  renderBlogPreview(0);

  // Ensure first blog item shows accent
  const firstNum = document.querySelector('#blog-item-0 .blog-num');
  if (firstNum) firstNum.classList.add('accent');

  // Typing effect for hero title accent word
  const accentEl = document.querySelector('.hero-title .accent');
  if (accentEl) {
    const words = ['foundation.', 'priority.', 'mindset.', 'lifestyle.'];
    let wi = 0;
    let ti = 0;
    let deleting = false;

    function typeWriter() {
      const word = words[wi];
      if (!deleting) {
        accentEl.textContent = word.slice(0, ti + 1);
        ti++;
        if (ti === word.length) {
          deleting = true;
          setTimeout(typeWriter, 2200);
          return;
        }
      } else {
        accentEl.textContent = word.slice(0, ti - 1);
        ti--;
        if (ti === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(typeWriter, deleting ? 60 : 90);
    }

    setTimeout(typeWriter, 2500);
  }
});
