
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import PostView from "./pages/PostView";
import PostEdit from "./pages/PostEdit";
import PostCreate from "./pages/PostCreate";
import useLocalStorage from "./hooks/useLocalStorage";

import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Search,
  Plus,
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  ChevronDown,
  PenLine,
  Eye,
  Trash2,
  Menu,
  X,
} from "lucide-react";

import "./App.css";

const initialPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Amit Sharma",
    category: "Technology",
    date: "Nov 09, 2026",
    status: "Published",
    views: 1248,
    color: "purple",
  },
  {
    id: 2,
    title: "The Art of Minimal Design",
    author: "Priya Verma",
    category: "Design",
    date: "Nov 08, 2026",
    status: "Published",
    views: 986,
    color: "orange",
  },
  {
    id: 3,
    title: "Building Better User Experiences",
    author: "Rahul Mehta",
    category: "Development",
    date: "Nov 07, 2026",
    status: "Draft",
    views: 0,
    color: "blue",
  },
  {
    id: 4,
    title: "Why Clean Code Matters",
    author: "Sneha Kapoor",
    category: "Technology",
    date: "Nov 06, 2026",
    status: "Published",
    views: 2156,
    color: "green",
  },
  {
    id: 5,
    title: "A Guide to Modern Web Development",
    author: "Amit Sharma",
    category: "Development",
    date: "Nov 05, 2026",
    status: "Published",
    views: 743,
    color: "pink",
  },
  {
    id: 6,
    title: "The Future of Artificial Intelligence",
    author: "Neha Singh",
    category: "Technology",
    date: "Nov 04, 2026",
    status: "Published",
    views: 1540,
    color: "purple",
  },
  {
    id: 7,
    title: "Designing for Real People",
    author: "Priya Verma",
    category: "Design",
    date: "Nov 03, 2026",
    status: "Draft",
    views: 0,
    color: "pink",
  },
  {
    id: 8,
    title: "Understanding JavaScript Basics",
    author: "Rahul Mehta",
    category: "Development",
    date: "Nov 02, 2026",
    status: "Published",
    views: 875,
    color: "blue",
  },
  {
    id: 9,
    title: "Building Your First Portfolio",
    author: "Sneha Kapoor",
    category: "Development",
    date: "Nov 01, 2026",
    status: "Published",
    views: 642,
    color: "green",
  },
  {
    id: 10,
    title: "Simple Habits for Better Productivity",
    author: "Amit Sharma",
    category: "Lifestyle",
    date: "Oct 31, 2026",
    status: "Published",
    views: 920,
    color: "orange",
  },
];

function Dashboard({ posts, setPosts }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");

  const [workspaceName, setWorkspaceName] = useLocalStorage(
    "workspaceName",
    "Postly Workspace"
  );

  const [adminName, setAdminName] = useLocalStorage(
    "adminName",
    "Admin"
  );

  const [adminEmail, setAdminEmail] = useLocalStorage(
    "adminEmail",
    "admin@postly.com"
  );

  const [settingsSaved, setSettingsSaved] = useState(false);

  // Unique Authors
  const authors = [
    ...new Set(posts.map((post) => post.author)),
  ];

  // Search + Status + Author Filter
  const filteredPosts = posts.filter((post) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.author.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || post.status === statusFilter;

    const matchesAuthor =
      authorFilter === "All" || post.author === authorFilter;

    return matchesSearch && matchesStatus && matchesAuthor;
  });
  const published = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "All Posts", icon: FileText },
    { name: "Authors", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  // Delete Post
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      setPosts((prevPosts) =>
        prevPosts.filter(
          (post) => String(post.id) !== String(id)
        )
      );
    }
  };

  return (
    <div className="app-layout">

      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-icon">P</div>

          <span>
            postly<span className="brand-dot">.</span>
          </span>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activeNav === name ? "nav-active" : ""
                }`}
              onClick={() => {
                setActiveNav(name);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{name}</span>

              {name === "All Posts" && (
                <span className="nav-count">{posts.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">

          <div className="help-card">
            <div className="help-icon">✦</div>

            <h4>Need a hand?</h4>

            <p>
              Make the most of your writing workspace.
            </p>

            <button
              onClick={() => alert("Help center coming soon!")}
            >
              Visit help center <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="profile">
            <div className="avatar avatar-dark">AS</div>

            <div className="profile-info">
              <strong>Amit Sharma</strong>
              <span>Administrator</span>
            </div>

            <MoreHorizontal size={20} />
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            Workspace <span>/</span>{" "}
            <strong>{activeNav}</strong>
          </div>

          <div className="topbar-right">

            {/* Search */}
            <div className="search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            {/* Author Filter */}
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="status-filter"
            >
              <option value="All">All Authors</option>

              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            {/* Notifications */}
            <button
              className="notification-btn"
              aria-label="Notifications"
              onClick={() => alert("You're all caught up!")}
            >
              <Bell size={19} />
              <span />
            </button>

          </div>
        </header>

        {/* Page Container */}
        <div className="page-container">

          {/* Authors Page */}
          {activeNav === "Settings" ? (
            <section className="posts-section settings-section">
              <div className="section-heading">
                <div>
                  <h2>Settings</h2>
                  <p>Manage your workspace and admin information.</p>
                </div>
              </div>

              <div className="settings-card">
                <h3>General Settings</h3>

                <div className="settings-form">
                  <label>Workspace Name</label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />

                  <label>Admin Name</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />

                  <label>Admin Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />

                  <button
                    className="save-settings-btn"
                    onClick={() => {
                      setSettingsSaved(false);

                      setTimeout(() => {
                        setSettingsSaved(true);
                      }, 100);
                    }}
                  >
                    Save Changes
                  </button>

                  {settingsSaved && (
                    <p className="settings-success">
                      Settings saved successfully!
                    </p>
                  )}
                </div>
              </div>
            </section>
          ) : activeNav === "Authors" ? (

            <section className="posts-section">

              <div className="section-heading">
                <div>
                  <h2>Authors</h2>
                  <p>
                    Manage all content authors in your workspace.
                  </p>
                </div>
              </div>

              <div className="posts-table-wrapper">

                <table className="posts-table">

                  <thead>
                    <tr>
                      <th>AUTHOR</th>
                      <th>TOTAL POSTS</th>
                      <th>PUBLISHED</th>
                      <th>DRAFTS</th>
                    </tr>
                  </thead>

                  <tbody>

                    {authors.map((author) => {

                      const authorPosts = posts.filter(
                        (post) => post.author === author
                      );

                      const publishedPosts = authorPosts.filter(
                        (post) => post.status === "Published"
                      ).length;

                      return (
                        <tr key={author}>

                          <td>
                            <div className="author-cell">

                              <div className="avatar">
                                {author
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")}
                              </div>

                              {author}

                            </div>
                          </td>

                          <td>{authorPosts.length}</td>

                          <td>{publishedPosts}</td>

                          <td>
                            {authorPosts.length - publishedPosts}
                          </td>

                        </tr>
                      );
                    })}

                    {authors.length === 0 && (
                      <tr>
                        <td colSpan="4" className="empty-row">
                          No authors found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </section>

          ) : (

            <>

              {/* Welcome Section */}
              <section className="welcome-section">

                <div>
                  <div className="date-label">
                    <CalendarDays size={14} />
                    MONDAY, NOVEMBER 09, 2026
                  </div>

                  <h1>
                    Good evening, Amit<span>.</span>
                  </h1>

                  <p>
                    Here's what's happening with your content today.
                  </p>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/posts/new")}
                >
                  <Plus size={18} />
                  Create new post
                </button>

              </section>

              {/* Statistics */}
              <section className="stats-grid">

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Total posts</span>

                    <div className="stat-icon purple-bg">
                      <FileText size={19} />
                    </div>
                  </div>

                  <div className="stat-value">{posts.length}</div>

                  <div className="stat-bottom">
                    <span className="trend">
                      <TrendingUp size={14} /> Workspace
                    </span>

                    <span className="stat-note">All time</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Published</span>

                    <div className="stat-icon green-bg">
                      <Eye size={19} />
                    </div>
                  </div>

                  <div className="stat-value">{published}</div>

                  <div className="stat-bottom">
                    <span className="trend green-text">
                      <TrendingUp size={14} /> Live content
                    </span>

                    <span className="stat-note">Active</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Drafts</span>

                    <div className="stat-icon orange-bg">
                      <PenLine size={19} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {posts.length - published}
                  </div>

                  <div className="stat-bottom">
                    <span className="trend orange-text">
                      <PenLine size={14} /> In progress
                    </span>

                    <span className="stat-note">Unpublished</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <span>Total views</span>

                    <div className="stat-icon blue-bg">
                      <TrendingUp size={19} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {posts.reduce(
                      (total, post) => total + post.views,
                      0
                    ).toLocaleString()}
                  </div>

                  <div className="stat-bottom">
                    <span className="trend">
                      <Eye size={14} /> Engagement
                    </span>

                    <span className="stat-note">Sample data</span>
                  </div>
                </div>

              </section>

              {/* Posts Section */}
              <section className="posts-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      {activeNav === "All Posts"
                        ? "All posts"
                        : "Recent posts"}
                    </h2>

                    <p>
                      {activeNav === "All Posts"
                        ? "Manage all your content in one place."
                        : "A look at your latest published content."}
                    </p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() => setActiveNav("All Posts")}
                  >
                    View all posts <ArrowUpRight size={16} />
                  </button>

                </div>

                {/* Posts Table */}
                <div className="posts-table-wrapper">

                  <table className="posts-table">

                    <thead>
                      <tr>
                        <th>POST TITLE</th>
                        <th>AUTHOR</th>
                        <th>CATEGORY</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>VIEWS</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>

                      {filteredPosts.map((post) => (
                        <tr key={post.id}>

                          <td>
                            <div className="post-title-cell">

                              <div className={`post-thumbnail ${post.color}`}>
                                {post.title.charAt(0)}
                              </div>

                              <strong
                                onClick={() => navigate(`/posts/${post.id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                {post.title}
                              </strong>

                            </div>
                          </td>

                          <td>
                            <div className="author-cell">

                              <div className="avatar">
                                {post.author
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")}
                              </div>

                              {post.author}

                            </div>
                          </td>

                          <td>
                            <span className="category-tag">
                              {post.category}
                            </span>
                          </td>

                          <td className="date-cell">
                            {post.date}
                          </td>

                          <td>
                            <span
                              className={`status ${post.status === "Published"
                                ? "status-published"
                                : "status-draft"
                                }`}
                            >
                              <span />
                              {post.status}
                            </span>
                          </td>

                          <td className="views-cell">
                            {post.views.toLocaleString()}
                          </td>

                          <td>
                            <button
                              className="row-action"
                              aria-label="Delete post"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>

                        </tr>
                      ))}

                      {filteredPosts.length === 0 && (
                        <tr>
                          <td colSpan="7" className="empty-row">
                            No posts found. Try another search or filter.
                          </td>
                        </tr>
                      )}

                    </tbody>

                  </table>

                </div>

                {/* Table Footer */}
                <div className="table-footer">

                  <span>
                    Showing <strong>{filteredPosts.length}</strong> of{" "}
                    <strong>{posts.length}</strong> posts
                  </span>

                  <button
                    className="pagination-btn"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                      setAuthorFilter("All");
                    }}
                  >
                    Clear filters <ChevronDown size={15} />
                  </button>

                </div>

              </section>

              {/* Footer */}
              <footer className="footer">
                <span>
                  © 2026 Postly. Built for better storytelling.
                </span>

                <span>
                  Made with care <span className="footer-heart">♥</span>
                </span>
              </footer>

            </>

          )}

        </div>
      </main>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useLocalStorage("posts", initialPosts);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Dashboard
              posts={posts}
              setPosts={setPosts}
            />
          }
        />

        <Route
          path="/posts/new"
          element={
            <PostCreate
              posts={posts}
              setPosts={setPosts}
            />
          }
        />

        <Route
          path="/posts/:id"
          element={<PostView posts={posts} />}
        />

        <Route
          path="/posts/:id/edit"
          element={
            <PostEdit
              posts={posts}
              setPosts={setPosts}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
