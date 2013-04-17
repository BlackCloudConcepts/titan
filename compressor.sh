#!/bin/bash
PS3="Choose(1-2):"
echo "Combine and Compress"
select name in "css" "js" "exit"
do
    break
done

# TO INSTALL YUI COMPRESSOR
# mkdir /yui
# cd /yui
# wget http://yui.zenfs.com/releases/yuicompressor/yuicompressor-2.4.6.zip
# unzip yuicompressor-2.4.6.zip
# (check if java is installed and install if necessary)
# rpm -qa | grep java
# which java
# yum install java-1.6.0-openjdk


if [[ $name == "css" ]]
then
    	cat css/button.css css/dropdown.css css/grouping.css css/inputTextbox.css css/master.css css/popup.css css/spiderweb.css css/toggle.css css/tooltip.css css/radioGroup.css css/checkbox.css > titan.jquery.css
    	java -jar /yui/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar titan.jquery.css > titan.jquery.min.css
fi

if [[ $name == "js" ]]
then
	cat js/base.js js/browserdetect.js js/button.js js/dropdown.js js/grouping.js js/inputTextbox.js js/popup.js js/spiderweb.js js/toggle.js js/tooltip.js js/radioGroup.js js/checkbox.js > titan.jquery.js
	java -jar /yui/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar titan.jquery.js > titan.jquery.min.js
fi
