#!/usr/bin/env python3
# stollen plagiarism checker
# by Seth Kenlon <skenlon@redhat.com>
# GPLv3

# This program is free software: you can redistribute it 
# and/or modify it under the terms of the GNU General 
# Public License as published by the Free Software 
# Foundation, either version 3 of the License, or (at 
# your option) any later version.

# This program is distributed in the hope that it will be
# useful, but WITHOUT ANY WARRANTY; without even the 
# implied warranty of MERCHANTABILITY or FITNESS FOR A 
# PARTICULAR PURPOSE.  See the GNU General Public License 
# for more details.

# You should have received a copy of the GNU General 
# Public License along with this program. 
# If not, see <http://www.gnu.org/licenses/>.

import sys
import random
from pathlib import Path
from googlesearch import search 

def Scrub(ARG):
    """
    Read lines of file.
    """

    f = open(ARG, encoding="utf-8") 
    LINES = f.readlines() 
    Search(LINES)

def Search(LINES):
    """
    Search Internet for exact match of LINE.
    """

    COUNT=0
    
    for LINE in LINES:
        COUNT += 1        
        PAUSE = random.randrange(1,4)

        if VERBOSE:
            print("Searching...")
            
        for ITEM in search(LINE, tld="com", num=1, stop=1, pause=PAUSE):
            print(ITEM)
            if VERBOSE:
                print("WARNING:" + LINE + " → " + ITEM)
            else:
                print("WARNING: line " + str(COUNT) + " → " + ITEM)

if __name__ == "__main__":
    random.seed()
    n=1
    
    if sys.argv[1] == "--verbose" or sys.argv[1] == "-v":
        VERBOSE = True
        # shift 1
        n += 1
    else:
        VERBOSE = False
        
    f = Path(sys.argv[n])

    if not f.is_file():
        print("Provide a text file to check.")
        exit()
    else:
        Scrub(sys.argv[n])