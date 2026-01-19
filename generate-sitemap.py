#!/usr/bin/env python3
"""
Automatically generate sitemap.xml for the site.
This script scans all HTML files and creates a sitemap with appropriate priorities.
"""

import os
import re
from datetime import datetime
from pathlib import Path
from typing import List, Tuple

# Base URL for the site
BASE_URL = "https://paigeturnertg.github.io"

# Directories and files to exclude
EXCLUDE_DIRS = {"templates", ".git", ".github"}
EXCLUDE_FILES = {"404.html"}


def get_priority_and_changefreq(file_path: str) -> Tuple[str, str]:
    """
    Determine priority and change frequency based on file location.

    Args:
        file_path: Relative path to the HTML file

    Returns:
        Tuple of (priority, changefreq)
    """
    # Main index page
    if file_path == "index.html":
        return ("1.0", "weekly")

    # Main section pages
    if file_path in ["about.html", "library.html", "blog.html"]:
        return ("0.9" if file_path in ["library.html", "blog.html"] else "0.8", "monthly")

    # Blog posts
    if file_path.startswith("blog/") and file_path != "blog.html":
        return ("0.7", "monthly")

    # Work index pages
    if "/index.html" in file_path and file_path.startswith("works/"):
        return ("0.8", "monthly")

    # Individual chapters and parts
    if file_path.startswith("works/"):
        return ("0.6", "yearly")

    # Default for any other pages
    return ("0.5", "monthly")


def find_html_files(root_dir: str = ".") -> List[str]:
    """
    Recursively find all HTML files in the repository.

    Args:
        root_dir: Root directory to search from

    Returns:
        List of relative file paths
    """
    html_files = []

    for root, dirs, files in os.walk(root_dir):
        # Remove excluded directories from search
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        # Find HTML files
        for file in files:
            if file.endswith(".html") and file not in EXCLUDE_FILES:
                # Get relative path from root
                rel_path = os.path.relpath(os.path.join(root, file), root_dir)
                html_files.append(rel_path)

    return sorted(html_files)


def get_file_last_modified(file_path: str) -> str:
    """
    Get the last modified date of a file in W3C format.

    Args:
        file_path: Path to the file

    Returns:
        Last modified date in YYYY-MM-DD format
    """
    try:
        mtime = os.path.getmtime(file_path)
        return datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")
    except:
        return datetime.now().strftime("%Y-%m-%d")


def generate_sitemap(html_files: List[str], output_file: str = "sitemap.xml") -> None:
    """
    Generate the sitemap.xml file.

    Args:
        html_files: List of HTML file paths
        output_file: Output sitemap filename
    """
    with open(output_file, "w", encoding="utf-8") as f:
        # Write XML header
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

        # Group files by category for better organization
        main_pages = []
        blog_posts = []
        work_indexes = []
        chapters = []

        for file_path in html_files:
            priority, changefreq = get_priority_and_changefreq(file_path)
            last_mod = get_file_last_modified(file_path)

            # Convert file path to URL
            url_path = file_path.replace("\\", "/")
            if url_path == "index.html":
                url_path = ""

            url_data = {
                "loc": f"{BASE_URL}/{url_path}",
                "priority": priority,
                "changefreq": changefreq,
                "lastmod": last_mod
            }

            # Categorize
            if file_path in ["index.html", "about.html", "library.html", "blog.html"]:
                main_pages.append(url_data)
            elif file_path.startswith("blog/"):
                blog_posts.append(url_data)
            elif "/index.html" in file_path and file_path.startswith("works/"):
                work_indexes.append(url_data)
            elif file_path.startswith("works/"):
                chapters.append(url_data)
            else:
                main_pages.append(url_data)

        # Write URLs in organized sections
        def write_url_entries(entries, comment):
            if entries:
                f.write(f"  <!-- {comment} -->\n")
                for entry in entries:
                    f.write("  <url>\n")
                    f.write(f"    <loc>{entry['loc']}</loc>\n")
                    f.write(f"    <lastmod>{entry['lastmod']}</lastmod>\n")
                    f.write(f"    <priority>{entry['priority']}</priority>\n")
                    f.write(f"    <changefreq>{entry['changefreq']}</changefreq>\n")
                    f.write("  </url>\n")
                f.write("\n")

        write_url_entries(main_pages, "Main Pages")
        write_url_entries(blog_posts, "Blog Posts")
        write_url_entries(work_indexes, "Work Indexes")
        write_url_entries(chapters, "Chapters and Parts")

        # Close XML
        f.write("</urlset>\n")


def main():
    """Main execution function."""
    print("🔍 Scanning for HTML files...")
    html_files = find_html_files()
    print(f"✓ Found {len(html_files)} HTML files")

    print("📝 Generating sitemap.xml...")
    generate_sitemap(html_files)
    print("✓ Sitemap generated successfully!")

    # Print summary
    print(f"\n📊 Sitemap Summary:")
    print(f"   Total URLs: {len(html_files)}")
    print(f"   Output: sitemap.xml")


if __name__ == "__main__":
    main()
