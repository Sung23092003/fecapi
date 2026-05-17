/**
* Template Name: NiceAdmin
* Updated: Nov 17 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  if (document.querySelector('textarea.tinymce-editor') && typeof tinymce !== 'undefined') {
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

    tinymce.init({
    selector: 'textarea.tinymce-editor, textarea#content_editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: false,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
     file_picker_callback: (callback, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');

        if (meta.filetype === 'image') {
          input.setAttribute('accept', 'image/*');
        } else if (meta.filetype === 'media') {
          input.setAttribute('accept', 'video/*,audio/*');
        } else {
          input.setAttribute('accept', '*/*');
        }

        input.onchange = async function () {
          const file = this.files[0];
          if (!file) return;
          try {
            const formData = new FormData();
            formData.append('file', file);
            const headers = Auth.getAuthHeader();
            delete headers['Content-Type'];
            const res = await fetch(`${ENV.BASE_URL}/admin/media/upload`, {
              method: 'POST',
              headers,
              body: formData
            });
            const json = await res.json();
            if (!json.success) throw new Error(json.message || 'Upload thất bại');
            const raw = json.data.url || '';
            const m = raw.match(/https?:\/\/[^\s"']+/);
            let url = m ? m[0] : raw;
            url = url.replace(/(?:\\?&[a-zA-Z#]+\d*;)+$/g, '');
            if (meta.filetype === 'image') {
              callback(url, { alt: file.name });
            } else if (meta.filetype === 'media') {
              callback(url, { source2: '', poster: '' });
            } else {
              callback(url, { text: file.name });
            }
          } catch (err) {
            console.error('Upload error:', err);
          }
        };

        input.click();
      },
     images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        const headers = Auth.getAuthHeader();
        delete headers['Content-Type'];
        fetch(`${ENV.BASE_URL}/admin/media/upload`, {
          method: 'POST',
          headers,
          body: formData
        }).then(res => res.json()).then(json => {
          if (!json.success) reject(json.message || 'Upload thất bại');
          else {
            const raw = json.data.url || '';
            const m = raw.match(/https?:\/\/[^\s"']+/);
            let url = m ? m[0] : raw;
            url = url.replace(/(?:\\?&[a-zA-Z#]+\d*;)+$/g, '');
            resolve(url);
          }
        }).catch(err => reject(err.message || 'Upload lỗi'));
      }),
     templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: 'oxide',
    content_css: 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });
  }

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Update user display name from localStorage
   */
  function updateUserDisplayName() {
    try {
      const userData = localStorage.getItem('cms_auth');
      if (!userData) return;
      
      const auth = JSON.parse(userData);
      if (!auth || !auth.user) return;
      
      const fullName = auth.user.user_full_name || '';
      
      // Update all elements showing user name
      document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = fullName;
      });
    } catch (e) {
      console.error('Error updating user display name:', e);
    }
  }

  // Update user name on page load
  document.addEventListener('DOMContentLoaded', updateUserDisplayName);

  /**
   * Handle logout for all elements with data-logout attribute
   */
  document.addEventListener('click', function(e) {
    const logoutEl = e.target.closest('[data-logout="true"]');
    if (logoutEl) {
      e.preventDefault();
      if (window.Auth && typeof window.Auth.logout === 'function') {
        window.Auth.logout();
      } else {
        // Fallback: manually clear token and redirect
        try {
          localStorage.removeItem('cms_auth');
        } catch (err) {
          console.error('Error clearing auth data:', err);
        }
        window.location.href = 'pages-login.html';
      }
    }
  });

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

  /**
   * Global Search - Dropdown style (vi)
   */
  const header = document.getElementById('header');
  const searchBarEl = header ? header.querySelector('.search-bar') : null;
  if (searchBarEl && searchBarEl.querySelector('input[type="text"]')) {
    const searchBar = searchBarEl;
    const searchForm = searchBar.querySelector('form');

    // Define menu items for search (only sidebar items)
    const searchMenuItems = [
      // 1. Dashboard
      { url: 'index.html', label: 'Dashboard', keys: ['Dashboard', 'Trang chủ'] },

      // 2. Quản lý Giao diện
      { url: '#', label: 'Quản lý Giao diện', keys: ['Giao diện', 'Layout', 'Đầu trang', 'Thân trang', 'Chân trang'] },
      { url: 'web-header.html', label: '  Quản lý Đầu Trang', keys: ['Đầu Trang', 'Header'] },
      { url: '#', label: '  Quản lý Thân Trang', keys: ['Thân Trang', 'Body'] },
      { url: '#', label: '  Quản lý Chân Trang', keys: ['Chân Trang', 'Footer'] },

      // 3. Quản lý danh mục
      { url: 'web-category.html', label: 'Quản lý danh mục', keys: ['Danh mục', 'Quản lý danh mục', 'Category'] },

      // 4. Quản lý bài viết
      { url: 'web-statics.html', label: '  Quản lý tin tức', keys: ['Tin tức', 'Bài viết', 'Quản lý bài viết', 'Statics', 'News'] },
      { url: '#', label: '    Quản lý dịch vụ', keys: ['Dịch vụ', 'Service'] },
      { url: '#', label: '      Quản lý tin tức', keys: ['Dịch vụ tin tức', 'Service news'] },
      { url: '#', label: '      Quản lý Landing Page', keys: ['Landing Page', 'Landing'] },
      { url: '#', label: '    Quản lý Sản phẩm', keys: ['Sản phẩm', 'Product'] },
      { url: '#', label: '      Quản Lý Bài Sản phẩm', keys: ['Bài Sản phẩm', 'Product post'] },
      { url: '#', label: '      Quản Lý Sản phẩm bán chạy', keys: ['Bán chạy', 'Best seller'] },
      { url: '#', label: '      Quản Lý thông tin thanh toán', keys: ['Thanh toán', 'Payment'] },

      // 5. Đơn hàng
      { url: '#', label: 'Quản lý Đơn hàng', keys: ['Đơn hàng', 'Order'] },

      // 6. Yêu cầu tư vấn
      { url: '#', label: 'Quản lý Yêu cầu tư vấn', keys: ['Yêu cầu tư vấn', 'Tư vấn', 'Consult'] },

      // 7. User người dùng
      { url: '#', label: 'Quản lý user người dùng', keys: ['User', 'Người dùng', 'Khách hàng'] },
      { url: '#', label: '  Quản lý user khách hàng', keys: ['Khách hàng', 'Customer'] },
      { url: '#', label: '  Quản lý cấp độ VIP', keys: ['VIP', 'Cấp độ', 'Vip'] },
      { url: '#', label: '  Quản lý Comment', keys: ['Comment', 'Bình luận'] },

      // 8. Mã và Link Chat
      { url: '#', label: 'Quản Lý Mã và Link Chat', keys: ['Mã', 'Link Chat', 'Chat', 'Code'] },

      // 9. User
      { url: 'web-users.html', label: 'Quản lý User', keys: ['Quản lý User', 'Users', 'Người dùng'] },

      // 10. Quy định & Hướng dẫn
      { url: '#', label: 'Quy định & Hướng dẫn', keys: ['Quy định', 'Hướng dẫn', 'Regulation'] },
      { url: '#', label: '  QL Quy định chung', keys: ['Quy định chung'] },
      { url: '#', label: '  QL Hướng dẫn', keys: ['Hướng dẫn'] },

      // 11. SEO
      { url: '#', label: 'Quản lý SEO', keys: ['SEO', 'Seo'] },

      // 12. Icons
      { url: 'icons-bootstrap.html', label: '  Bootstrap', keys: ['Bootstrap', 'Icon Bootstrap'] },
      { url: 'icons-remix.html', label: '  Remix', keys: ['Remix', 'Icon Remix'] },
      { url: 'icons-boxicons.html', label: '  Boxicons', keys: ['Boxicons', 'Icon Boxicons'] },
      { url: 'https://fontawesome.com/search?ic=free-collection', label: '  Fontawesome', keys: ['Fontawesome', 'Icon Fontawesome'], blank: true },

      // 13. Cài đặt Chung
      { url: 'web-role.html', label: '    Quản lý quyền', keys: ['Quyền', 'Role', 'Phân quyền'] },
      { url: 'web-role-group.html', label: '    Quản lý nhóm quyền', keys: ['Nhóm quyền', 'Role group'] },
      { url: 'web-menu-visibility.html', label: '  Cài đặt ẩn/hiện menu', keys: ['Ẩn menu', 'Hiện menu', 'Menu'] },
      { url: '#', label: '  Quản lý ĐVHC', keys: ['ĐVHC', 'Đơn vị hành chính'] },
      { url: '#', label: '  Hướng dẫn BFE', keys: ['BFE', 'Hướng dẫn'] }
    ];

    // Remove Vietnamese accents for accent-insensitive search
    function removeVietnameseTones(str) {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/[^a-z0-9\s]/g, '');
      return str;
    }

    // Create dropdown container
    const searchDropdown = document.createElement('div');
    searchDropdown.className = 'global-search-dropdown';
    searchDropdown.style.cssText = 'display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.12);max-height:360px;overflow-y:auto;z-index:9999;margin-top:4px;';
    searchBar.style.position = 'relative';
    searchBar.appendChild(searchDropdown);

    const searchInput = searchBar.querySelector('input');
    if (searchInput) {
      searchInput.setAttribute('autocomplete', 'off');
      searchInput.placeholder = 'Tìm kiếm trang...';
    }

    let selectedIndex = -1;
    let currentResults = [];

    function escapeHtml(str) {
      return String(str ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    function highlightMatch(text, query) {
      if (!query) return escapeHtml(text);
      const normalizedText = removeVietnameseTones(text);
      const idx = normalizedText.indexOf(query);
      if (idx === -1) return escapeHtml(text);
      const before = escapeHtml(text.substring(0, idx));
      const match = escapeHtml(text.substring(idx, idx + query.length));
      const after = escapeHtml(text.substring(idx + query.length));
      return `${before}<span style="background:#bfdbfe;font-weight:600;border-radius:2px;padding:0 1px;">${match}</span>${after}`;
    }

    function renderSearchResults(results, query) {
      searchDropdown.innerHTML = '';
      if (results.length === 0) {
        searchDropdown.innerHTML = '<div style="padding:12px 16px;color:#999;font-size:14px;text-align:center;">Không tìm thấy kết quả</div>';
        searchDropdown.style.display = 'block';
        currentResults = [];
        selectedIndex = -1;
        return;
      }

      currentResults = results;
      selectedIndex = -1;
      results.forEach((item, i) => {
        const el = document.createElement('a');
        el.href = item.url;
        if (item.blank) el.target = '_blank';
        el.className = 'global-search-item';
        el.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 16px;color:#333;text-decoration:none;font-size:14px;border-bottom:1px solid #f0f0f0;transition:background .15s;cursor:pointer;';
        if (i === results.length - 1) el.style.borderBottom = 'none';
        el.innerHTML = `<i class="bi bi-file-earmark" style="color:#6c757d;font-size:12px;"></i><span>${highlightMatch(item.label, query)}</span>`;
        el.addEventListener('mouseenter', () => {
          document.querySelectorAll('.global-search-item').forEach(e => e.style.background = '');
          el.style.background = '#bfdbfe';
          selectedIndex = i;
        });
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (item.blank) {
            window.open(item.url, '_blank');
          } else {
            window.location.href = item.url;
          }
        });
        searchDropdown.appendChild(el);
      });
      searchDropdown.style.display = 'block';
    }

    function performSearch() {
      const query = removeVietnameseTones(searchInput.value.trim());
      if (!query) {
        searchDropdown.style.display = 'none';
        currentResults = [];
        selectedIndex = -1;
        return;
      }

      const results = searchMenuItems.filter(item =>
        item.keys.some(key => removeVietnameseTones(key).includes(query))
      );
      renderSearchResults(results, query);
    }

    // Debounce
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(performSearch, 100);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = searchDropdown.querySelectorAll('.global-search-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateHighlight(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateHighlight(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          const item = items[selectedIndex];
          if (item.href) window.location.href = item.href;
        }
      } else if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
        searchInput.blur();
      }
    });

    function updateHighlight(items) {
      items.forEach((el, i) => {
        el.style.background = i === selectedIndex ? '#bfdbfe' : '';
      });
      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!searchBar.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });

    // Prevent form submit
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => e.preventDefault());
      searchForm.action = 'javascript:void(0)';
    }
  }

  /**
   * Bottom Menu (Mobile)
   */
  const BOTTOM_MENU_KEY = 'niceadmin_menu_bottom';

  function isBottomMenuEnabled() {
    try { return localStorage.getItem(BOTTOM_MENU_KEY) === 'true'; }
    catch { return false; }
  }

  function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  let _bottomMenuEscapeHandler = null;

  function renderBottomMenu() {
    const enabled = isBottomMenuEnabled();
    const body = document.body;

    // Clean up existing elements and listeners
    const oldMenu = document.getElementById('bottomMenu');
    if (oldMenu) oldMenu.remove();
    const oldOverlay = document.querySelector('.bottom-menu-overlay');
    if (oldOverlay) oldOverlay.remove();
    const oldMore = document.querySelector('.bottom-menu-more-dropdown');
    if (oldMore) oldMore.remove();
    if (_bottomMenuEscapeHandler) {
      document.removeEventListener('keydown', _bottomMenuEscapeHandler);
      _bottomMenuEscapeHandler = null;
    }

    body.classList.remove('bottom-menu-active');

    if (!enabled) return;

    body.classList.add('bottom-menu-active');

    const currentPage = getCurrentPage();

    const items = [
      { url: 'index.html', label: 'Trang chủ', icon: 'bi-house' },
      { url: 'web-category.html', label: 'Danh mục', icon: 'bi-folder' },
      { url: 'web-statics.html', label: 'Bài viết', icon: 'bi-file-earmark-text' },
      { url: null, label: 'Thêm', icon: 'bi-three-dots', isMore: true },
    ];

    // Bottom nav bar
    const menu = document.createElement('nav');
    menu.id = 'bottomMenu';
    menu.className = 'bottom-menu';

    items.forEach(function (item) {
      const el = document.createElement(item.url ? 'a' : 'button');
      el.className = 'bottom-menu-item';
      if (item.url) {
        el.href = item.url;
        if (currentPage === item.url) el.classList.add('active');
      }
      el.innerHTML = '<i class="bi ' + item.icon + '"></i><span>' + item.label + '</span>';
      menu.appendChild(el);
    });

    body.appendChild(menu);

    // Overlay for more bottom sheet
    const overlay = document.createElement('div');
    overlay.className = 'bottom-menu-overlay';
    body.appendChild(overlay);

    // More bottom sheet (full sidebar)
    const moreDropdown = document.createElement('div');
    moreDropdown.className = 'bottom-menu-more-dropdown';

    // Header with close button
    const header = document.createElement('div');
    header.className = 'bottom-more-header';
    header.innerHTML = '<span class="bottom-more-title">Danh mục</span><button class="bottom-more-close" type="button"><i class="bi bi-x-lg"></i></button>';
    moreDropdown.appendChild(header);

    // Clone sidebar nav content
    const sidebarNav = document.querySelector('#sidebar-nav');
    if (sidebarNav) {
      const clone = sidebarNav.cloneNode(true);
      clone.id = 'bottom-sidebar-nav';

      // Apply visibility settings: match by index from original sidebar
      const origItems = sidebarNav.querySelectorAll('.nav-item, .nav-content li');
      const cloneItems = clone.querySelectorAll('.nav-item, .nav-content li');
      origItems.forEach(function (orig, idx) {
        if (idx < cloneItems.length && orig.style.display === 'none') {
          cloneItems[idx].style.display = 'none';
        }
      });

      // Convert all collapse toggles to simple expand/collapse
      clone.querySelectorAll('a[data-bs-toggle="collapse"]').forEach(function (link) {
        const targetId = link.getAttribute('data-bs-target');
        if (!targetId) return;
        const id = targetId.replace('#', '');
        const target = clone.querySelector('#' + id.replace(/[^\w-]/g, ''));
        if (!target) return;

        link.removeAttribute('data-bs-toggle');
        link.removeAttribute('data-bs-target');
        link.removeAttribute('data-bs-parent');
        target.classList.remove('collapse');

        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          target.classList.toggle('bottom-nav-open');
          link.classList.toggle('collapsed');
        });
      });

      // Clean remaining data-bs attributes
      clone.querySelectorAll('[data-bs-parent]').forEach(function (el) {
        el.removeAttribute('data-bs-parent');
      });

      // Mark active page
      clone.querySelectorAll('a').forEach(function (a) {
        const href = a.getAttribute('href');
        if (href && getCurrentPage() === href.split('/').pop()) {
          a.classList.add('active');
        }
      });

      moreDropdown.appendChild(clone);
    }

    body.appendChild(moreDropdown);

    // Toggle more bottom sheet
    const moreBtn = menu.querySelector('.bottom-menu-item:last-child');
    function openMore() {
      moreDropdown.classList.add('show');
      overlay.classList.add('show');
      body.classList.add('bottom-more-open');
    }
    function closeMore() {
      moreDropdown.classList.remove('show');
      overlay.classList.remove('show');
      body.classList.remove('bottom-more-open');
    }

    if (moreBtn) {
      moreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (moreDropdown.classList.contains('show')) {
          closeMore();
        } else {
          openMore();
        }
      });
    }

    // Close button in header
    moreDropdown.querySelector('.bottom-more-close')?.addEventListener('click', closeMore);

    // Close on overlay click
    overlay.addEventListener('click', closeMore);

    // Close on Escape
    _bottomMenuEscapeHandler = function (e) {
      if (e.key === 'Escape') closeMore();
    };
    document.addEventListener('keydown', _bottomMenuEscapeHandler);
  }

  // Re-render when setting changes (listen for storage events from other tabs)
  window.addEventListener('storage', function (e) {
    if (e.key === BOTTOM_MENU_KEY) {
      renderBottomMenu();
    }
  });

  // Listen for custom event from the settings page
  window.addEventListener('bottomMenuChange', function () {
    renderBottomMenu();
  });

  // Render on DOMContentLoaded
  function bottomMenuInit() {
    setTimeout(renderBottomMenu, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bottomMenuInit);
  } else {
    bottomMenuInit();
  }

})();