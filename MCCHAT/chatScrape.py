import time, os
import requests

def follow(thefile):
    thefile.seek(0,2)  # Go to the end of the file
    while True:
        line = thefile.readline()
        if not line:
            time.sleep(0.1)  # Sleep briefly
            continue
        yield line

if __name__ == "__main__":
    log_path = r"C:\Users\arona22\Desktop\MultiMC\instances\1.20.4\.minecraft\logs\latest.log"
    with open(log_path, "r") as logfile:
        loglines = follow(logfile)
        for line in loglines:
            if "[Render thread/INFO]: [CHAT]" in line:
                requests.post('http://localhost:3000/message', json={'message': line})
