import subprocess
from pathlib import Path


def git_commit_and_push(file_to_commit, commit_message):
    # Add the file to the staging area
    subprocess.run(['git', 'add', str(file_to_commit)])

    # Commit the changes
    subprocess.run(['git', 'commit', '-m', commit_message])

    # Push the changes to GitHub
    subprocess.run(['git', 'push', 'origin', 'master'])


if __name__ == "__main__":
    # Set the file to be committed
    file_to_commit = Path("data/tristate_northeast.json")

    # Set your commit message
    commit_message = "Auto commit"

    # Call the function to commit and push
    git_commit_and_push(file_to_commit, commit_message)
