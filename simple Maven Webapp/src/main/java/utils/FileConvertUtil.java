package utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
/**
 * 文件转换
 * @author Administrator
 *
 */
public class FileConvertUtil {

	public FileConvertUtil() {

	}
	/**
	 * 文件转换为SWF，报表打开使用
	 * @param file
	 */
	public static void conver2Swf(File file) {
		String fileName = file.getName();
		String fileNameNoSuffix = fileName.substring(0,
				fileName.lastIndexOf("."));
		String officeFile = file.getAbsolutePath();

		String pdfFilePath = ReadProperties
				.getPropertie(ReadProperties.saveFilePath);
		String pdfFile = pdfFilePath + "//" + fileNameNoSuffix + ".pdf";
		office2PDF(officeFile, pdfFile);
		String swfFilePath = ReadProperties
				.getPropertie(ReadProperties.swfSaveFilePath);
		String swfFile = swfFilePath + "//" + fileNameNoSuffix + ".swf";
		/**PDF 转换为 SWF*/
		pdf2SWF(pdfFile, swfFile);

		File pdfFILE = new File(pdfFile);
		if (pdfFILE.exists()) {
			pdfFILE.delete();
		}
	}

	/**
	 * 将PDF文档转换为swf格式的FLASH文件. 运行该函数需要用到SWFTools, 下载地址为
	 * http://www.swftools.org/download.html
	 * 
	 * <pre>
	 * 示例:
	 * String sourcePath = "F:\\PDF\\source.pdf";
	 * String destFile = "F:\\SWF\\dest.swf";
	 * try {
	 * 	Converter.pdf2SWF(sourcePath, destFile);
	 * } catch (IOException e) {
	 * 	e.printStackTrace();
	 * }
	 * </pre>
	 * 
	 * @param sourceFile
	 *            源文件(即PDF文档)路径, 包括源文件的文件名. 示例: D:\\PDF\\source.pdf
	 * @param destFile
	 *            目标文件路径, 即需要保存的文件路径(包括文件名). 示例: D:\\SWF\\dest.swf
	 * @return 操作成功与否的提示信息. 如果返回 -1, 表示找不到源PDF文件, 或配置文件url.properties配置错误; 如果返回
	 *         0, 则表示操作成功; 返回1或其他, 则表示转换失败
	 */
	public static int pdf2SWF(String sourceFile, String destFile) {

		// 目标路径不存在则建立目标路径
		File dest = new File(destFile);
		if (!dest.getParentFile().exists())
			dest.getParentFile().mkdirs();
		if (dest.exists()) {
			dest.delete();
		}
		// 源文件不存在则返回 -1
		File source = new File(sourceFile);
		if (!source.exists())
			return -1;

		String t = ReadProperties.getPropertie(ReadProperties.SWFTools_HOME);
		if (t == null)
			return -1;
		// 如果从文件中读取的URL地址最后一个字符不是 '\'，则添加'\'
		if (t.charAt(t.length() - 1) != '\\') {
			t += "\\";
		}

		try {
			// 调用pdf2swf命令进行转换swfextract -i - sourceFilePath.pdf -o
			// destFilePath.swf
			String command = t + "pdf2swf.exe  -i " + sourceFile + " -s flashversion=9 -o "
					+ destFile;
			Process pro = Runtime.getRuntime().exec(command);

			BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(pro.getInputStream()));
			while (bufferedReader.readLine() != null) {

			}
			pro.waitFor();
			return pro.exitValue();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return 1;
	}

	/**
	 * 将Office文档转换为PDF. 运行该函数需要用到OpenOffice, OpenOffice下载地址为
	 * http://www.openoffice.org/
	 * 
	 * <pre>
	 * 方法示例:
	 * String sourcePath = "F:\\office\\source.doc";
	 * String destFile = "F:\\pdf\\dest.pdf";
	 * Converter.office2PDF(sourcePath, destFile);
	 * </pre>
	 * 
	 * @param sourceFile
	 *            源文件, 可以是相对路径, 也可以是绝对路径. 可以是Office2003-2007全部格式的文档, 包括.doc,
	 *            .docx, .xls, .xlsx, .ppt, .pptx等. 示例: F:\\office\\source.doc
	 * @param destFile
	 *            目标文件. 可以是相对路径, 也可以是绝对路径. 示例: F:\\pdf\\dest.pdf
	 * @return 操作成功与否的提示信息. 如果返回 -1, 表示找不到源文件, 或url.properties配置错误; 如果返回 0,
	 *         则表示操作成功; 返回1, 则表示转换失败
	 */
	public static int office2PDF(String sourceFile, String destFile) {
		try {
			File inputFile = new File(sourceFile);
			if (!inputFile.exists()) {
				return -1;// 找不到源文件, 则返回-1
			}

			// 如果目标路径不存在, 则新建该路径
			File outputFile = new File(destFile);
			if (!outputFile.getParentFile().exists()) {
				outputFile.getParentFile().mkdirs();
			}
			if (!outputFile.exists()) {
				outputFile.delete();
			}

			String t = ReadProperties
					.getPropertie(ReadProperties.OpenOffice_HOME);
			if (t == null) {
				return -1;
			}
			// 如果从文件中读取的URL地址最后一个字符不是 '\'，则添加'\'
			if (t.charAt(t.length() - 1) != '\\') {
				t += "\\";
			}
			// 启动OpenOffice的服务
			String command = t
					+ "program\\soffice.exe -headless -accept=\"socket,host=127.0.0.1,port=8100;urp;\" -nofirststartwizard";
			Process pro = Runtime.getRuntime().exec(command);
			// connect to an OpenOffice.org instance running on port 8100
			OpenOfficeConnection connection = null;
			String ip = "127.0.0.1";
			int port = 8100;
			connection = new SocketOpenOfficeConnection(ip, port);
			connection.connect();

			// convert
			DocumentConverter converter = new OpenOfficeDocumentConverter(
					connection);
			converter.convert(inputFile, outputFile);

			// close the connection
			connection.disconnect();
			// 关闭OpenOffice服务的进程
			pro.destroy();

			return 0;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 1;
	}

}
