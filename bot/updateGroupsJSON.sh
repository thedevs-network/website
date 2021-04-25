#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
exec > /tmp/tempgroup
echo '['
for i in $(jq -r '.[] | "\(.displayName)💩\(.name)💩\(.id)💩\(.link)"' < groups.json); do
	#displayName=$(echo ${i} | awk -F💩 '{ print $1 }')
	name=$(       echo ${i} | awk -F💩 '{ print $2 }')
	id=$(         echo ${i} | awk -F💩 '{ print $3 }')
	link=$(       echo ${i} | awk -F💩 '{ print $4 }')
	scrappedHTML=$(curl --silent https://t.me/joinchat/${link})
	displayName=$(echo "${scrappedHTML}" | grep '<span dir="auto">' | sed 's/<span dir="auto">//g' | sed 's/<\/span>//')
	memberCount=$(echo "${scrappedHTML}" | grep extra | cut -c30- | sed 's/ //g' | sed 's/members.*//g')
	imageLink=$(echo "${scrappedHTML}" | grep 'og:image' | cut -c36- | sed 's/">//g')
	if [[ ! -e ../static/img/${name}.png ]]; then
		#echo "Downloading missing group image!"
		curl --silent ${imageLink} > /tmp/groupimage.jpg
		convert /tmp/groupimage.jpg -resize 64x64 ../static/img/${name}.png
	fi
	cat << EOF
  {
    "displayName": "${displayName}",
    "name": "${name}",
    "id": "${id}",
    "link": "${link}",
    "count": ${memberCount}
  },
EOF
done
echo ']'

# Yeet the final comma in "},"
temp=$(cat /tmp/tempgroup)
echo "${temp}" | tac | sed -z 's/},/}/' | tac > /tmp/tempgroup

jq -r 'sort_by(.count) | reverse' < /tmp/tempgroup > groups.json
