from agent import analyze_meeting


transcript = """
Priya: We need to finish the login module by Friday.

Rahul: I'll handle the backend API.

Ananya: I'll work on the frontend.

Priya: Good. Let's test everything on Monday.

Rahul: I'll send the API documentation by Thursday.
"""


result = analyze_meeting(transcript)

print("\n===== MEETING SUMMARY =====")
print(result["summary"])

print("\n===== KEY DECISIONS =====")
for decision in result["key_decisions"]:
    print("-", decision)

print("\n===== ACTION ITEMS =====")
for item in result["action_items"]:
    print(f"- Task: {item['task']}")
    print(f"  Owner: {item['owner']}")
    print(f"  Deadline: {item['deadline']}")