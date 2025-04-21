from PIL import Image
# import pillow
import os
import matplotlib.pyplot as plt 
from tqdm import tqdm

base_dir = "photos/3/images"
widths = []
# inspect photo sizes
for fp in tqdm(os.listdir(base_dir)):
    os.remove(f"{base_dir}/{fp}")

