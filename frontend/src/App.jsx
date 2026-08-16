import { useState } from "react";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeMeeting = async () => {
    if (!transcript.trim()) {
      setError("Please enter a meeting transcript.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://meeting-to-action-agent.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: transcript,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the meeting.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        "Could not connect to the backend. Make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Meeting-to-Action Agent</h1>

          <p style={styles.subtitle}>
            Turn meeting transcripts into clear, structured action items.
          </p>
        </div>

        <div style={styles.status}>
          <span style={styles.statusDot}></span>
          AI Agent
        </div>
      </header>

      <main style={styles.container}>
        <section style={styles.inputCard}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.heading}>Meeting Transcript</h2>

              <p style={styles.description}>
                Paste your meeting conversation below and let the AI extract
                the important information.
              </p>
            </div>
          </div>

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={`Example:

Priya: We need to finish the login module by Friday.
Rahul: I'll handle the backend API.
Ananya: I'll work on the frontend.
Priya: Good. Let's test everything on Monday.
Rahul: I'll send the API documentation by Thursday.`}
            style={styles.textarea}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            onClick={analyzeMeeting}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Analyzing Meeting..." : "Analyze Meeting"}
          </button>
        </section>

        {result && (
          <section style={styles.results}>
            <h2 style={styles.resultsTitle}>Meeting Analysis</h2>

            <div style={styles.summaryCard}>
              <h3 style={styles.cardTitle}>Summary</h3>

              <p style={styles.summary}>{result.summary}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Key Decisions</h3>

              {result.key_decisions?.length > 0 ? (
                <ul style={styles.list}>
                  {result.key_decisions.map((decision, index) => (
                    <li key={index} style={styles.listItem}>
                      {decision}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No key decisions found.</p>
              )}
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Action Items</h3>

              <div style={styles.actionGrid}>
                {result.action_items?.map((item, index) => (
                  <div key={index} style={styles.actionItem}>
                    <h4 style={styles.task}>{item.task}</h4>

                    <div style={styles.meta}>
                      <span>
                        <strong>Owner:</strong>{" "}
                        {item.owner || "Not assigned"}
                      </span>

                      <span>
                        <strong>Deadline:</strong>{" "}
                        {item.deadline || "Not specified"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#172033",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "28px 7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 750,
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#667085",
    fontSize: "15px",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#ecfdf3",
    color: "#027a48",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#12b76a",
  },

  container: {
    width: "86%",
    maxWidth: "1100px",
    margin: "40px auto",
  },

  inputCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 8px 30px rgba(16, 24, 40, 0.06)",
    border: "1px solid #eaecf0",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  heading: {
    margin: 0,
    fontSize: "22px",
  },

  description: {
    margin: "7px 0 0",
    color: "#667085",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    minHeight: "260px",
    boxSizing: "border-box",
    resize: "vertical",
    padding: "18px",
    border: "1px solid #d0d5dd",
    borderRadius: "12px",
    fontSize: "15px",
    lineHeight: 1.6,
    outline: "none",
    fontFamily: "inherit",
  },

  button: {
    marginTop: "18px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 650,
  },

  error: {
    color: "#d92d20",
    marginBottom: 0,
    fontSize: "14px",
  },

  results: {
    marginTop: "35px",
  },

  resultsTitle: {
    fontSize: "24px",
    marginBottom: "18px",
  },

  summaryCard: {
    background: "#eef4ff",
    border: "1px solid #c7d7fe",
    borderRadius: "15px",
    padding: "24px",
    marginBottom: "18px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #eaecf0",
    borderRadius: "15px",
    padding: "24px",
    marginBottom: "18px",
    boxShadow: "0 5px 20px rgba(16, 24, 40, 0.04)",
  },

  cardTitle: {
    margin: "0 0 14px",
    fontSize: "18px",
  },

  summary: {
    margin: 0,
    color: "#344054",
    lineHeight: 1.7,
  },

  list: {
    margin: 0,
    paddingLeft: "20px",
  },

  listItem: {
    marginBottom: "10px",
    color: "#344054",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "14px",
  },

  actionItem: {
    border: "1px solid #e4e7ec",
    borderRadius: "12px",
    padding: "18px",
    background: "#fafafa",
  },

  task: {
    margin: "0 0 15px",
    fontSize: "16px",
  },

  meta: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#667085",
    fontSize: "13px",
  },
};

export default App;