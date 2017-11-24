package file;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import base.action.BaseAction;

public class FileAction extends BaseAction implements Serializable{
	
	private File file;
	private String fileFileName;
	private String fileContentType;
	private String newFileName;
	private String[] filesName;
	public String upload() {
//		System.out.println("fileName:" + fileFileName);
//		System.out.println("fileType:" + fileContentType);
//		System.out.println("file:" + file);
		if (null != file) {
			String realPath = ServletActionContext.getServletContext()
					.getRealPath("/file");
//			System.out.println("路径" + realPath);
			String suffix = fileFileName.substring(fileFileName
					.lastIndexOf("."));
			if (fileFileName.lastIndexOf(".") == -1) {
				return INPUT;
			}
			this.newFileName = fileFileName;
//			System.out.println(this.newFileName);
			File newFile = new File(new File(realPath), newFileName);
			if (!newFile.getParentFile().exists()) {
				newFile.getParentFile().mkdirs();
			}
			try {
				FileUtils.copyFile(file, newFile);
//				System.out.println("上传成功");
				if (file.exists()) {
					file.delete();
				}
			} catch (IOException e) {
				e.printStackTrace();
//				System.out.println("上传失败");
				return INPUT;
			}
			File listFile = new File(realPath);
			this.filesName = listFile.list();
//			System.out.println(filesName.length);
		}
		return SUCCESS;
	}
}
