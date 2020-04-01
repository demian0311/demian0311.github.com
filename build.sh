#!/bin/zsh

jekyll build
gcloud config configurations activate neidetcher-com
gsutil -m rsync -R ./_site gs://www.neidetcher.com
