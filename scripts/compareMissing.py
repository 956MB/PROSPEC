import json
import os
import requests
from time import sleep
from configparser import ConfigParser
from urllib.parse import quote

def main():
    for sp in os.listdir(splash):
        s_splash = sp.rstrip('_0.jpg')
        match = False
        for cut in os.listdir(cutout):
            s_cut = cut.rstrip('.png')
            if (s_splash == s_cut):
                match = True
                break
        
        if (not match): print(False, s_splash)

if __name__ == "__main__":
    cutout = 'cutouts'
    splash = 'splash'

    main()